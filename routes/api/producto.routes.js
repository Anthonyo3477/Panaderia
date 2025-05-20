const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productoController = require('../controllers/productoController');

// Configuración de multer para carga de imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await productoController.getAllProductos();
        res.render('panaderia', { productos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener productos');
    }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
        const producto = await productoController.getProductoById(req.params.id);
        if (!producto || producto.length === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.render('producto', { producto: producto[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener producto');
    }
});

// Insertar un nuevo producto
router.post('/insert', upload.single('imagen'), async (req, res) => {
    try {
        const { nombre, clasificacion, descripcion } = req.body;
        const imagen = req.file ? req.file.filename : 'default.jpg';

        if (!nombre || !clasificacion || !descripcion) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        const producto = { nombre, clasificacion, descripcion, imagen };
        const result = await productoController.insertProducto(producto);
        res.status(201).send(result);
    } catch (error) {
        console.error('Error al insertar producto:', error);
        res.status(500).send('Error al insertar producto');
    }
});

// Actualizar un producto
router.put('/update/:id', upload.single('imagen'), async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, clasificacion, descripcion } = req.body;
        const imagen = req.file ? req.file.filename : null;

        const result = await productoController.updateProducto(id, nombre, clasificacion, descripcion, imagen);
        res.status(200).send(result);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).send('Error al actualizar producto');
    }
});

// Eliminar un producto
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await productoController.deleteProducto(id);
        res.status(200).send(result);
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).send('Error al eliminar producto');
    }
});

module.exports = router;
