const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const multer = require('multer');
const upload = multer({ dest: 'public/img/' });

router.get('/listar', productoController.listarProductos);
router.get('/agregar', productoController.mostrarFormularioAgregar);
router.post('/agregar', upload.single('imagen'), productoController.agregarProducto);

module.exports = router;
