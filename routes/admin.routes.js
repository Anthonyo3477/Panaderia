const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/home', adminController.homeAdmin);

module.exports = router;