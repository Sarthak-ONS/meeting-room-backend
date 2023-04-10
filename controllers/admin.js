const cron = require("node-cron");

const axios = require("axios");
const abc = require("../helpers/firebase_helpers");

exports.datatobeSentToServer;

cron.schedule("*/15 * * * * *", async () => {
  console.log("Checking Database every 5 secs");
  datatobeSentToServer = await abc();
  console.log(datatobeSentToServer);
  this.sendDatatoServer();
});

exports.sendDatatoServer = async () => {
  try {
    console.log("Sending Data to Server");
    const url = `${process.env.PYTHON_SERVER_LINK}/displaydata`;
    const data = {
      user_id: datatobeSentToServer ? datatobeSentToServer.user_id : "",
      meeting_id: !datatobeSentToServer
        ? ""
        : datatobeSentToServer.meeting_room_id,
      door_id: "dasdakdbdiua2387gbffbsj",
      unlockedAt: `${new Date().toISOString()}`,
      start_time: `${new Date().toISOString()}`,
      end_time: `${new Date().toISOString()}`,
      meeting_objective: !datatobeSentToServer
        ? ""
        : datatobeSentToServer.meeting_objective,
      user: {
        user_name: !datatobeSentToServer ? "" : datatobeSentToServer.name,
        user_email: !datatobeSentToServer ? "" : datatobeSentToServer.email,
      },
    };
    await axios
      .post(url, data)
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
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
