// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const cors = require('cors')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors()); // allow all origins for dev; restrict in production with { origin: 'https://your-site' }

// capture raw body bytes so HMAC can be computed over the exact bytes the client sent
app.use(express.json({
  limit: '1mb',
  verify: (req, res, buf) => {
    // store raw string for signature verification
    req.rawBody = buf && buf.length ? buf.toString('utf8') : '';
  }
}));


// --- fallback files ---
const DATA_FALLBACK = path.join(__dirname, 'registrations.jsonl');
const EMAIL_FALLBACK = path.join(__dirname, 'pending-emails.jsonl');

// --- optional HMAC secret for verifying incoming webhooks ---
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || ''; // set in .env for security

// --- Mongoose connection (non-fatal) ---
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Mongo connected'))
    .catch(err => console.error('Mongo connect error:', err.message || err));
} else {
  console.log('No MONGODB_URI set — DB disabled');
}

// helper: send notification email (uses transporter). Add near top of server.js
async function sendNotificationEmail({ name, email, phone, interest, raw }) {
  const notifyTo = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;
  if (!notifyTo) {
    console.log('No NOTIFY_EMAIL configured — skipping email');
    return;
  }

  const subject = `UB Metro: шинэ бүртгэл — ${email || name || '(no email)'}`;
  const bodyText = [
    `Нэр: ${name || ''}`,
    `Имэйл: ${email || ''}`,
    `Утас: ${phone || ''}`,
    `Сонирхсон: ${Array.isArray(interest) ? interest.join(', ') : (interest || '')}`,
    '',
    'Raw payload:',
    JSON.stringify(raw || {}, null, 2)
  ].join('\n');

  const bodyHtml = `
    <p><strong>Нэр:</strong> ${name || ''}<br/>
    <strong>Имэйл:</strong> ${email || ''}<br/>
    <strong>Утас:</strong> ${phone || ''}<br/>
    <strong>Сонирхсон:</strong> ${Array.isArray(interest) ? interest.join(', ') : (interest || '')}</p>
    <hr/>
    <pre style="white-space:pre-wrap">${JSON.stringify(raw || {}, null, 2)}</pre>
  `;

  if (!transporter) {
    // transporter missing -> write fallback
    appendLine(EMAIL_FALLBACK, { to: notifyTo, subject, text: bodyText, createdAt: new Date().toISOString() });
    console.log('No SMTP transporter configured — wrote notification to', EMAIL_FALLBACK);
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: notifyTo,
      subject,
      text: bodyText,
      html: bodyHtml
    });
    console.log('Notification email sent:', info.messageId || info.response || '(no messageId)');
  } catch (err) {
    console.error('Email send failed — writing to fallback file', err && err.message || err);
    appendLine(EMAIL_FALLBACK, { to: notifyTo, subject, text: bodyText, error: err && err.message || String(err), createdAt: new Date().toISOString() });
  }
}


// --- Schema & model ---
const registrationSchema = new mongoose.Schema({
  providerId: { type: String, index: true, sparse: true },
  payloadHash: { type: String, index: true, unique: true, sparse: true },
  name: String,
  email: { type: String, required: true },
  phone: String,
  interest: [String],
  message: String,                // last message (optional)
  messages: [ { text: String, raw: mongoose.Schema.Types.Mixed, createdAt: { type: Date, default: Date.now } } ], // history
  raw: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
}, { strict: false });


const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);

// --- Nodemailer setup (optional) ---
let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_PORT) === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  transporter.verify()
    .then(() => console.log('SMTP transporter ready'))
    .catch(err => {
      console.error('SMTP verify failed:', err.message || err);
      transporter = null;
    });
} else {
  console.log('SMTP not configured — email notifications disabled');
}

// --- helper: compute HMAC signature (sha256) ---
function computeHmac(bodyString, secret) {
  return crypto.createHmac('sha256', secret).update(bodyString, 'utf8').digest('hex');
}

// --- helper: append fallback file (newline-delimited JSON) ---
function appendLine(filename, obj) {
  try {
    fs.appendFileSync(filename, JSON.stringify(obj) + '\n', 'utf8');
  } catch (err) {
    console.error('Failed to write fallback file', filename, err);
  }
}

// --- webhook route ---
// --- webhook route ---
app.post('/webhook/form', async (req, res) => {
  try {
    // Use the raw bytes captured by express.json verify middleware
    const rawBody = (typeof req.rawBody === 'string' && req.rawBody.length) ? req.rawBody : JSON.stringify(req.body || {});
    const incomingSig = (req.get('X-Signature') || '').replace(/^sha256=/, '');
    const expected = computeHmac(rawBody, WEBHOOK_SECRET);

    // debug — remove or reduce in production
    console.log('>>> incomingSig:', incomingSig);
    console.log('>>> expected  :', expected);
    console.log('>>> rawBody len:', rawBody.length);

    // Verify signature if a secret is configured
    if (WEBHOOK_SECRET) {
      if (!incomingSig) {
        console.warn('Missing signature header');
        return res.status(401).json({ error: 'Invalid signature' });
      }

      const incomingBuf = Buffer.from(incomingSig, 'hex');
      const expectedBuf = Buffer.from(expected, 'hex');

      if (incomingBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(incomingBuf, expectedBuf)) {
        console.warn('Webhook signature mismatch');
        return res.status(401).json({ error: 'Invalid signature' });
      }
    }

    // Acknowledge quickly (2xx) so the sender doesn't keep retrying
    res.status(200).json({ ok: true });

    // Background processing — run but do not await (respond already sent)
    (async () => {
      try {
        const payload = (() => {
          try { return JSON.parse(rawBody); } catch(e) { return req.body || {}; }
        })();

        const providerId = payload.id || payload.submission_id || payload.response_id || null;
        const payloadHash = crypto.createHash('sha256').update(rawBody).digest('hex');

        // Extract fields
        const name = (payload.name || payload.full_name || payload.fields?.name) || '';
        const email = payload.email || payload.fields?.email || payload.contact?.email || payload.data?.email;
        const phone = payload.phone || payload.fields?.phone || '';
        let interest = [];
        if (payload.interest) interest = Array.isArray(payload.interest) ? payload.interest : [payload.interest];
        else if (payload.fields && payload.fields.interest) interest = payload.fields.interest;
        else if (payload.answers && Array.isArray(payload.answers)) {
          payload.answers.forEach(a => { if (a.name && a.value && /interest/i.test(a.name)) interest.push(a.value); });
        }

        if (!email) {
          console.warn('Webhook payload missing email; payload saved to fallback');
          appendLine(DATA_FALLBACK, { reason: 'missing_email', payload, receivedAt: new Date().toISOString() });
          return;
        }

        if (mongoose.connection.readyState === 1) {
          try {
            const existing = await Registration.findOne({
              $or: [
                providerId ? { providerId } : null,
                { payloadHash }
              ].filter(Boolean)
            }).exec();

            if (existing) {
              console.log('Duplicate submission detected; skipping DB save', providerId || payloadHash);
            } else {
            // create the new registration and initialize messages history if message present
              const doc = await Registration.create({
                providerId,
                payloadHash,
                name,
                email,
                phone,
                interest,
                message,                     // keep last message available
                messages: message ? [{
                  text: message,
                  raw: payload,
                  createdAt: new Date()
                }] : [],
                raw: payload
              });

              console.log('Saved registration id:', doc._id.toString());

              // send notification email in background (do not await to keep API snappy)
              // sendNotificationEmail should be defined earlier in server.js
              sendNotificationEmail({
                name: doc.name,
                email: doc.email,
                phone: doc.phone,
                interest: doc.interest,
                raw: doc.raw
              }).catch(err => {
                // just log — sendNotificationEmail already writes fallback on failure,
                // but we protect against any unexpected promise rejection here
                console.error('sendNotificationEmail error:', err && err.message ? err.message : err);
              });
            }

          } catch (dbErr) {
            console.error('DB save error; falling back to file', dbErr.message || dbErr);
            appendLine(DATA_FALLBACK, { payload, receivedAt: new Date().toISOString(), dbError: dbErr.message || String(dbErr) });
          }
        } else {
          appendLine(DATA_FALLBACK, { payload, receivedAt: new Date().toISOString() });
          console.log('DB not connected — wrote payload to', DATA_FALLBACK);
        }

        // Prepare notification email text
        const notifyTo = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;
        const subject = `New form submission: ${email}`;
        const text = [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Interest: ${Array.isArray(interest) ? interest.join(', ') : interest}`,
          '',
          'Raw payload:',
          rawBody
        ].join('\n');

        if (transporter && notifyTo) {
          transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: notifyTo,
            subject,
            text
          }).then(info => {
            console.log('Notification email sent:', info.messageId || info.response || '(no messageId)');
          }).catch(mailErr => {
            console.error('Email send failed — writing to fallback file', mailErr.message || mailErr);
            appendLine(EMAIL_FALLBACK, { to: notifyTo, subject, text, error: mailErr.message || String(mailErr), createdAt: new Date().toISOString() });
          });
        } else {
          appendLine(EMAIL_FALLBACK, { to: notifyTo, subject, text, createdAt: new Date().toISOString() });
          console.log('No transporter configured — notification written to', EMAIL_FALLBACK);
        }

      } catch (bgErr) {
        console.error('Background webhook processing error:', bgErr);
      }
    })();

  } catch (err) {
    console.error('Webhook handler error:', err);
    // If we haven't already responded, send a 500
    try { if (!res.headersSent) res.status(500).json({ error: 'Server error' }); } catch (e) {}
  }
});

// Client-safe endpoint for browser forms (no HMAC) — production-ready
app.post('/api/registrations', async (req, res) => {
  try {
    const rawBody = (typeof req.rawBody === 'string' && req.rawBody.length) ? req.rawBody : JSON.stringify(req.body || {});
    const payload = req.body || {};
    const email = payload.email || '';
    if (!email) return res.status(400).json({ error: 'email required' });

    const payloadHash = crypto.createHash('sha256').update(rawBody).digest('hex');
    const providerId = payload.id || null;
    const message = payload.message || payload.msg || payload.text || '';

    if (mongoose.connection.readyState === 1) {
      try {
        const existing = await Registration.findOne({
          $or: [{ providerId }, { payloadHash }].filter(Boolean)
        }).exec();

        if (existing) {
          try {
            const item = { text: message || '', raw: payload, createdAt: new Date() };

            await Registration.updateOne(
              { _id: existing._id },
              {
                $set: { raw: payload, message },   // keep last message accessible
                $push: { messages: item }          // append history
              }
            ).exec();

            console.log('Appended message to existing registration:', existing._id.toString());
            return res.status(200).json({ ok: true, appended: true });
          } catch (uErr) {
            console.error('Failed to append message:', uErr);
            return res.status(200).json({ ok: true, error: 'append_failed' });
          }
        }


        // create new doc
        const doc = await Registration.create({
          providerId,
          payloadHash,
          name: payload.name || '',
          email,
          phone: payload.phone || '',
          interest: payload.interest || [],
          message,
          raw: payload
        });

        console.log('Saved registration from client:', email, doc._id.toString());
        return res.status(201).json({ ok: true, id: doc._id.toString() });

      } catch (dbErr) {
        console.error('DB save error — falling back to file:', dbErr.message || dbErr);
        appendLine(DATA_FALLBACK, { payload, dbError: dbErr.message || String(dbErr), receivedAt: new Date().toISOString() });
        return res.status(201).json({ ok: true, fallback: true });
      }
    } else {
      appendLine(DATA_FALLBACK, { payload, receivedAt: new Date().toISOString() });
      console.log('DB not connected — wrote client payload to', DATA_FALLBACK);
      return res.status(201).json({ ok: true, fallback: true });
    }

  } catch (err) {
    console.error('POST /api/registrations error:', err);
    return res.status(500).json({ error: 'server error' });
  }
});



// health & debug endpoints
app.get('/ping', (req, res) => res.json({ ok: true, now: new Date().toISOString() }));
app.get('/_debug/emails', (req,res) => {
  // convenience debug route (do not expose in prod) — returns last 200 lines of fallback emails
  try {
    if (!fs.existsSync(EMAIL_FALLBACK)) return res.json([]);
    const data = fs.readFileSync(EMAIL_FALLBACK, 'utf8').trim().split('\n').slice(-200).map(l => JSON.parse(l));
    res.json(data);
  } catch(e){ res.status(500).json({ error: e.message || String(e) }); }
});

// 404 fallback
app.use((_,res) => res.status(404).json({ error: 'not found' }));

app.listen(PORT, () => console.log(`Webhook service listening on ${PORT}`));
