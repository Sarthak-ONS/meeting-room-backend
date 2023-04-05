const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const axios = require('axios');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key:
                process.env.SENDGRID_API_KEY
        }
    })
);

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
        const meetingRoom = collection(db, 'MeetingRooms');
        const meetingSnapshot = await getDocs(meetingRoom);
        const cityList = meetingSnapshot.docs.map(doc => doc.data());
        console.log(cityList);
    } catch (error) {
        console.log(error);
    }
};

const sendMeetingRoomData = () => {
    while (true) {
        setTimeout(3000, () => {

        })
    }
}

exports.unlockDoor = (req, res, next) => {
    console.log(req.body, "////////////////");

    // TODO : Below URL has to be replaced by Arduino Server URL;
    axios.post(`${process.env.PYTHON_SERVER_LINK}/unlockDoor`, {
        "user_id": "fsdsadfei2378boifbwuef",
        "meeting_id": "sfsuliblsiub23buiqeq",
        "door_id": "dasdakdbdiua2387gbffbsj",
        "unlockedAt": `${new Date().toISOString()}`,
        "meeting_objective": "Testing For Presentation",
        "user": {
            "user_name": "Sarvesh Gupta",
            "user_email": "sarvesh@sarvesh.dev"
        },
    })
        .then(result => {
            console.log(result.data);
            res.status(200).json({ message: 'Door Unlocked!' });
        })
        .catch(err => {
            next(err);
        });

};

exports.lockDoor = (req, res, next) => {
    console.log(req.body, "////////////////");
    // TODO : Below URL has to be replaced by Arduino Server URL;
    axios.post(`${process.env.PYTHON_SERVER_LINK}/lockDoor`, {
        "user_id": "fsdsadfei2378boifbwuef",
        "meeting_id": "sfsuliblsiub23buiqeq",
        "door_id": "dasdakdbdiua2387gbffbsj",
        "unlockedAt": `${new Date().toISOString()}`,
        "meeting_objective": "Testing For Presentation",
        "user": {
            "user_name": "Sarvesh Gupta",
            "user_email": "sarvesh@sarvesh.dev"
        },
    })
        .then(result => {
            console.log(result.data);
            res.status(200).json({ message: 'Door Locked!' });
        })
        .catch(err => {
            next(err);
        });

};

exports.sendEmail = (req, res, next) => {
    console.log(req.body);
    transporter.sendMail({
        to: 'prajwaldeep1109@gmail.com',
        from: 'deshyashishu2@gmail.com',
        subject: 'Ericssion India PVT LTD',
        html: `
          <p>Your meeting is booked successfully.</p>
        `
    })
        .then(result => {
            console.log(result, "////////////");
            res.status(200).json({ message: 'Email Sent Successfully.' });
        })
        .catch(err => {
            console.log(err);
            next(err);
        });

}
