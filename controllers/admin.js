const cron = require("node-cron");
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");

const axios = require("axios");

const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.FIREBASE_SENDER_ID}`,
  appId: `${process.env.FIREBASE_APP_ID}`,
};

const f_app = initializeApp(firebaseConfig);
const db = getFirestore(f_app);

const abc = async () => {
  try {
    const meetingRoom = collection(db, "bookings");
    const meetingSnapshot = await collection(meetingRoom);
    const cityList = meetingSnapshot.docs.map((doc) => doc.data());
    console.log(cityList);
  } catch (error) {
    console.log(error);
  }
};

cron.schedule("1 1 14 30 3 ", function () {
    console.log("running a task every 2 second");
    abc();
});

exports.sendDatatoServer = (req, res, next) => {
  console.log("Sending Data to Server");
  const url = `${process.env.PYTHON_SERVER_LINK}/displaydata`;
  const data = {
    user_id: "fsdsadfei2378boifbwuef",
    meeting_id: "sfsuliblsiub23buiqeq",
    door_id: "dasdakdbdiua2387gbffbsj",
    unlockedAt: `${new Date().toISOString()}`,
    start_time: `${new Date().toISOString()}`,
    end_time: `${new Date().toISOString()}`,
    "meeting_objective": "LabView CLasses",
        "user": {
            "user_name": "Sarvesh Gupta",
            "user_email": "sarvesh@sarvesh.dev"
        },
  };
  axios
    .post(url, data)
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Sent Data successfully!" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postDanger = (req, res, next) => {
  if (!req.body) {
    res.status(500).json({ message: "No data found" });
  }
  console.log(req.body);
  res.status(201).json({ message: "Danger has been acknowledge." });
};

//TODO: After meeting finsihes fetch the logs from hardware server.
exports.fetchLogsFromHardwareServer = (req, res, next) => {
  axios
    .get(`${process.env.PYTHON_SERVER_LINK}/getLogs`)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};
