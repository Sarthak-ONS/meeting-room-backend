const express = require('express')
const router = express.Router();

const adminController = require('../controllers/admin')

router.post('/postDanger', adminController.postDanger);


module.exports = router;