const express = require("express");
const axios = require("axios");

const router = express.Router();

// Replace with your Firebase project details
const projectId = "login-143c8";
const serverKey =
  "AAAADEU1e-4:APA91bGaLpC0CM-OfdPdHFfwDgowvAlhtpjTFmrhYuUR1rDVLKJbPpfTRzSHrfoqAe00jXiAcTiADt7m71-T1tz4bLoG5zuTKpU54zvML1Ygqc5SCw5-wkaltyR-1ys4brcynrkfDI3t";

// Replace with the recipient's FCM token
const fcmToken =
  "dnbIwhO5S0ix6BMTprfVl1:APA91bEcYvsiaYgmuNBUOclUJkbXY54ixz_aNaBitbjPj0kM78P_3bGFYiVVIDCM-cb6IMin1OGJgfK8M54eGyZIZHafR96vVfpnZzxAsDX0iA-Xu2k-nkC0sjr_V-uOBwBsvQDysM0q";

// Access Token
const userAccessToken = 'ya29.a0AfB_byArSQKaD0K27fiFUYiSExiq2YTvORaaWuieXUmLKSZigqiEKahqo0D3k1iAU1hEf12qJjWyJPZOpvN-Q21nF6CCKVatylAYkvzVuRKNPHA07vuHkiotxAZLOqQ-XJx3HXdHIbqq_gpr_ZXMbQdml-02RxqBnMARaCgYKAfASARMSFQGOcNnCtjqTttuF2TV2B7q8TYsB6w0171'

// Construct the FCM API endpoint
const endpoint = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;

// Create the JSON payload for the notification
const payload = {
  message: {
    token: fcmToken,
    notification: {
      title: "Notification Title",
      body: "Notification Body",
    },
  },
};

// Set up the headers for the HTTP request
const headers = {
  Authorization: `Bearer ${userAccessToken}`,
  "Content-Type": "application/json",
};

router.get("/send-notification", (req, res) => {
  // Send the HTTP POST request to FCM
  axios
    .post(endpoint, payload, { headers })
    .then((response) => {
      console.log("Notification sent successfully:", response.data);
      res.send("Notification sent successfully");
    })
    .catch((error) => {
      console.error("Error sending notification:", error.response.data);
      res.status(500).send("Error sending notification");
    });
});

module.exports = router;
