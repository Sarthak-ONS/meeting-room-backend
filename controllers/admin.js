const cron = require("node-cron"); const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const axios = require('axios');


const firebaseConfig = {
    apiKey: `${process.env.FIREBASE_API_KEY}`,
    authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
    projectId: `${process.env.FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.FIREBASE_SENDER_ID}`,
    appId: `${process.env.FIREBASE_APP_ID}`
};

const f_app = initializeApp(firebaseConfig);
const db = getFirestore(f_app);

const abc = async () => {
    try {
        const meetingRoom = collection(db, 'bookings');
        const meetingSnapshot = await collection(meetingRoom);
        const cityList = meetingSnapshot.docs.map(doc => doc.data());
        console.log(cityList);
    } catch (error) {
        console.log(error);
    }
}

cron.schedule("*/10 * * * * *", function () {
    console.log("running a task every 2 second");
    abc();


});

exports.postDanger = (req, res, next) => {
    if (!req.body) {
        res.status(500).json({ message: 'No data found' });
    }
    console.log(req.body);
    res.status(201).json({ message: 'Danger has been acknowledge.' })
};
