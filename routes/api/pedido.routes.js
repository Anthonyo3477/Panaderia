const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/listar', pedidoController.listarPedidos);

module.exports = router;
