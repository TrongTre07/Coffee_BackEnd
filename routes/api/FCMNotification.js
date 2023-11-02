const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const router = express.Router();

process.env.GOOGLE_APPLICATION_CREDENTIALS;
const fcmToken =
  "dnb_IwhO5S0ix6BMTprfVl1:APA91bEcYvsiaYgmuNBUOclUJkbXY54ixz_aNaBitbjPj0kM78P_3bGFYiVVIDCM-cb6IMin1OGJgfK8M54eGyZIZHafR96vVfpnZzxAsDX0iA-Xu2k-nkC0sjr_V-uOBwBsvQDysM0q";

const serviceAccount = require("../../login-143c8-firebase-adminsdk-mgzik-4f0b707d6a.json");
initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "login-143c8",
});

router.post("/send", function (req, res) {
  const receivedToken = req.body.fcmToken;

  const message = {
    notification: {
      title: "Notif",
      body: "This is a Test Notification",
    },
    token: fcmToken,
  };

  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Successfully sent message",
        token: receivedToken,
      });
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message:", error);
    });
});

module.exports = router;
