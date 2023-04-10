const express = require('express')
const router = express.Router();

const userController = require('../controllers/user')

router.post('/unlockDoor', userController.unlockDoor);

router.post('/lockDoor', userController.lockDoor);

router.post('/sendEmail', userController.sendEmail);

module.exports = router;