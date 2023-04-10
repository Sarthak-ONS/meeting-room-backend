const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");
const axios = require("axios");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { html_file, html_file_delete_mail } = require("../html_mail");

let transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "herculesproject7@outlook.com",
    pass: "hercules7@7",
  },
});

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
    const meetingRoom = collection(db, "MeetingRooms");
    const meetingSnapshot = await getDocs(meetingRoom);
    const cityList = meetingSnapshot.docs.map((doc) => doc.data());
    console.log(cityList);
  } catch (error) {
    console.log(error);
  }
};

const sendMeetingRoomData = () => {
  while (true) {
    setTimeout(3000, () => {});
  }
};

exports.unlockDoor = (req, res, next) => {
  console.log(req.body, "////////////////");

  // TODO : Below URL has to be replaced by Arduino Server URL;
  axios
    .post(`${process.env.PYTHON_SERVER_LINK}/unlockDoor`, {
      user_id: req.body.user_id,
      meeting_id: "sfsuliblsiub23buiqeq",
      door_id: "dasdakdbdiua2387gbffbsj",
      unlockedAt: `${new Date().toISOString()}`,
      meeting_objective: req.body.meeting_objective,
      user: {
        user_name: req.body.user.user_name,
        user_email: req.body.user.user_email,
      },
    })
    .then((result) => {
      console.log(result.data);
      res.status(200).json({ message: "Door Unlocked!", status: result.data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.lockDoor = (req, res, next) => {
  console.log(req.body, "////////////////");
  // TODO : Below URL has to be replaced by Arduino Server URL;

  axios
    .post(`${process.env.PYTHON_SERVER_LINK}/lockDoor`, {
      user_id: req.body.user_id,
      meeting_id: "sfsuliblsiub23buiqeq",
      door_id: "dasdakdbdiua2387gbffbsj",
      unlockedAt: `${new Date().toISOString()}`,
      meeting_objective: req.body.meeting_objective,
      user: {
        user_name: req.body.user.user_name,
        user_email: req.body.user.user_email,
      },
    })
    .then((result) => {
      console.log(result.data);
      res
        .status(200)
        .json({ message: "Door Locked!", status: result.data.toString() });
    })
    .catch((err) => {
      next(err);
    });
};

exports.sendEmail = async (req, res, next) => {
  const {
    name,
    formattedDate,
    formattedTime,
    meetingObjective,
    userEmail,
    isDelete,
  } = req.body;
  console.log(req.body);

  transporter.sendMail(
    {
      from: "herculesproject7@outlook.com",
      to: userEmail,
      bcc: [
        "agarwalsarthak456@gmail.com",
        "gsamarth14@gmail.com",
        "bookexpo1810@gmail.com",
      ],
      subject: isDelete ? "Booking Cancellation" : "Booking Confirmation",
      // html: htmlToSend, // html body
      html: isDelete
        ? html_file_delete_mail(
            name,
            formattedDate,
            formattedTime,
            meetingObjective
          )
        : html_file(name, formattedDate, formattedTime, meetingObjective),
    },
    (err, inf) => {
      if (err) {
        res.status(500).json({ message: "Could Not send Mail!" });
      }
      res.status(200).json({ message: "Mail has beeen sent!" });
    }
  );
};
