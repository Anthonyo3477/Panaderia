const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.mostrarFormularioLogin);
router.post('/login', authController.login);
router.post('/registrar', authController.registrar);

module.exports = router;
