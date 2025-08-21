const mongoose = require('mongoose');
require('dotenv').config();

(async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const col = mongoose.connection.collection('registrations');

    const cursor = col.find({}).toArray();
    const docs = await cursor;
    for (const d of docs) {
      const msgText = d.message || (d.raw && d.raw.message) || '';
      const item = { text: msgText, raw: d.raw || {}, createdAt: d.createdAt || new Date() };
      await col.updateOne({ _id: d._id }, { $set: { messages: [item] } });
      console.log('Migrated', d._id.toString());
    }

    await mongoose.disconnect();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
