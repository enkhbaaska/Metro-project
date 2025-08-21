// server/recent.js
const mongoose = require('mongoose');
require('dotenv').config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const docs = await mongoose.connection.collection('registrations')
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    console.log('recent docs:', docs.length);
    docs.forEach(d => {
      console.log({
        _id: d._id?.toString?.(),
        email: d.email,
        // last message (if present)
        message: d.message,
        // messages history (if you implemented messages array)
        messages: (d.messages || []).map(m => ({ text: m.text, createdAt: m.createdAt })),
        raw: d.raw,
        payloadHash: d.payloadHash,
        createdAt: d.createdAt
      });
    });

    await mongoose.disconnect();
  } catch (e) {
    console.error('recent.js error:', e);
    process.exit(1);
  }
})();
