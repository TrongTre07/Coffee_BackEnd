const express = require('express');
const router = express.Router();

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKeyPath),
});

router.post('/send-notification', async (req, res) => {
  const token = req.body.token;
  const message = req.body.message;

  const notification = {
    token,
    message,
  };

  try {
    await admin.messaging().sendToDevice(notification);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
