const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  CollectionReference,
} = require("firebase-admin/firestore");

const serviceAccount = require("../firebase_config.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const abc = async () => {
  try {
    let col = await db
      .collection("bookings")
      .doc("STJiWl8WFdDlYP91pvV8")
      .collection("date-time")
      .doc(changeDateToCustomFormat())
      .get();

    if (col.data()[changeTimetoCustomFormat()].user_id != "") {
      const uId = col.data()[changeTimetoCustomFormat()].user_id;
      let userDoc = await db.collection("Users").doc(uId).get();
      return {
        name: userDoc.data()["name"],
        email: userDoc.data()["email"],
        ...findbooking(userDoc.data().bookings, changeTimetoCustomFormat()),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

changeDateToCustomFormat = () => {
  const currentDate = new Date().toLocaleString().slice(0, 10);
  console.log(currentDate);
  const day = parseInt(currentDate.split("/")[1]).toString();
  const month = parseInt(currentDate.split("/")[0]).toString();
  const year = parseInt(currentDate.split("/")[2]).toString();
  return day + month + year;
};

changeTimetoCustomFormat = () => {
  const currentTime = new Date().toLocaleString().slice(11, 15);

  var minutes = currentTime.split(":")[1];

  if (minutes < 15) {
    minutes = "00";
  } else if (minutes < 30) {
    minutes = "15";
  } else if (minutes < 45) {
    minutes = "30";
  } else if (minutes < 60) {
    minutes = "45";
  }
  var newTime = currentTime.split(":")[0] + minutes;
  if (newTime.length == 3) {
    newTime = "0" + newTime;
  }
  return newTime;
};

findbooking = (listOfBookings, time) => {
  for (var i = 0; i < listOfBookings.length; i++) {
    if (
      +time >= +listOfBookings[i].start_time &&
      +time <= +listOfBookings[i].end_time
    ) {
      return listOfBookings[i];
    }
  }
};

changeTimetoCustomFormat();

module.exports = abc;
