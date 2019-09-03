const express = require('express');
require('dotenv').config();
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

// initializing express
const app = express();

// configure static folder where client stuffs will be placed (Set static path)
/* Current directory means = __dirname*/
app.use(express.static(path.join(__dirname, "client")));

// adding the body-parser middleware
app.use(bodyParser.json());

/* Vapid Keys- Identifies the person sending out the notifications */
// create a set of vapid keys
const publicVapidKey = process.env.Public_Key;
const privateVapidKey = process.env.Private_Key;

// setting vapid details
webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// Subscribe Route
app.post('/subscribe', (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});

    // Create Payload
    const payload = JSON.stringify({ title: 'Push Test' });

    // Pass object into send Notification
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = process.env.PORT || 5000;

// listen on the port
app.listen(port, () => console.log(`Server started on port ${port}`));