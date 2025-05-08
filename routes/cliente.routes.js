const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/carro', clienteController.mostrarCarro);

module.exports = router;
