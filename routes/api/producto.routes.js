const express = require('express');
const router = express.Router();
const productoController = require('../../db/controllers/productoController');

// Middlewares para parsear datos
router.use(express.urlencoded({ extended: true })); // Para formularios HTML
router.use(express.json()); // Para API JSON

// Mostrar formulario de creación
router.get('/nuevo', (req, res) => {
    try {
        res.render('nuevo-producto', {
            title: 'Registrar Nuevo Producto',
            categorias: ['Pan', 'Torta', 'Pastel', 'Otro']
        });
    } catch (error) {
        console.error('Error al renderizar formulario:', error);
        res.status(500).render('error', {
            message: 'Error al cargar el formulario'
        });
    }
});

// Listar todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await productoController.getAllProductos();
        res.render('panaderia', {
            title: 'Listado de Productos',
            productos: productos
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).render('error', {
            message: 'Error al cargar los productos'
        });
    }
});

// Mostrar detalle de un producto
router.get('/:id', async (req, res) => {
    try {
        const producto = await productoController.getProductoById(req.params.id);

        if (!producto || producto.length === 0) {
            return res.status(404).render('error', {
                message: 'Producto no encontrado'
            });
        }

        res.render('producto-detalle', {
            title: producto[0].nombre,
            producto: producto[0]
        });
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).render('error', {
            message: 'Error al cargar el producto'
        });
    }
});

// Procesar creación de producto
router.post('/insert', async (req, res) => {
    try {
        const { nombre, clasificacion, descripcion } = req.body;

        // Validación mejorada
        if (!nombre?.trim() || !clasificacion?.trim() || !descripcion?.trim()) {
            return res.status(400).render('nuevo-producto', {
                error: 'Todos los campos son obligatorios',
                valores: req.body,
                categorias: ['Pan', 'Torta', 'Pastel', 'Otro']
            });
        }

        const nuevoProducto = {
            nombre: nombre.trim(),
            clasificacion: clasificacion.trim(),
            descripcion: descripcion.trim()
        };

        const resultado = await productoController.insertProducto(nuevoProducto);

        res.redirect('/producto');
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).render('nuevo-producto', {
            error: 'Error al guardar el producto',
            valores: req.body,
            categorias: ['Pan', 'Torta', 'Pastel', 'Otro']
        });
    }
});

// Actualizar producto (formulario)
router.get('/editar/:id', async (req, res) => {
    try {
        const producto = await productoController.getProductoById(req.params.id);

        if (!producto || producto.length === 0) {
            return res.status(404).render('error', {
                message: 'Producto no encontrado'
            });
        }

        res.render('editar-producto', {
            title: `Editar ${producto[0].nombre}`,
            producto: producto[0],
            categorias: ['Pan', 'Torta', 'Pastel', 'Otro']
        });
    } catch (error) {
        console.error('Error al cargar formulario de edición:', error);
        res.status(500).render('error', {
            message: 'Error al cargar el formulario'
        });
    }
});

// Procesar actualización de producto
router.post('/actualizar/:id', async (req, res) => {
    try {
        const { nombre, clasificacion, descripcion } = req.body;

        if (!nombre?.trim() || !clasificacion?.trim() || !descripcion?.trim()) {
            return res.status(400).render('editar-producto', {
                error: 'Todos los campos son obligatorios',
                producto: {
                    id: req.params.id,
                    ...req.body
                },
                categorias: ['Pan', 'Torta', 'Pastel', 'Otro']
            });
        }

        const productoActualizado = {
            nombre: nombre.trim(),
            clasificacion: clasificacion.trim(),
            descripcion: descripcion.trim()
        };

        await productoController.updateProducto(req.params.id, productoActualizado);

        res.redirect(`/producto/${req.params.id}`);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).render('editar-producto', {
            error: 'Error al actualizar el producto',
            producto: {
                id: req.params.id,
                ...req.body
            },
            categorias: ['Pan', 'Torta', 'Pastel', 'Otro']
        });
    }
});

// Eliminar producto
router.post('/eliminar/:id', async (req, res) => {
    try {
        await productoController.deleteProducto(req.params.id);
        res.redirect('/producto');
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).render('error', {
            message: 'Error al eliminar el producto'
        });
    }
});

module.exports = router;