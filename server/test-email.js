// server/test-email.js
require('dotenv').config();
const nodemailer = require('nodemailer');

(async ()=>{
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_PORT) === '465',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });

  try {
    await transporter.verify();
    console.log('transporter ok');
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
      subject: 'UB Metro test email',
      text: 'This is a test email from your local server'
    });
    console.log('sent', info.messageId || info.response || info);
  } catch (e) {
    console.error('send failed', e);
  }
  process.exit(0);
})();
