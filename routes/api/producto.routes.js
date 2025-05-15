
const { Router } = require('express');
const productoController = require('../../db/controllers/productoController.js');
const ruta = Router();
const con = require('../../db/Conexion.js');

// Listar todos los productos
ruta.get("/", async (req , res) => {
    try {
        const productos = await productosController.getAll();
        res.render('panaderia', { productos });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener productos");
    }
});

// Mostrar un producto por ID
ruta.get("/:getById/:id", async (req , res) => {
    const id = req.params.id;
    try {
        const producto = await productosController.getById(id);
        if (!producto) {
            return res.status(404).send("Producto no encontrado");
        }
        res.render('producto', { producto });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener producto");
    }
});

// Insertar un nuevo producto
ruta.post('/insert', async (req, res) => { 
    try{
        const {  nombre, clasificacion, descripcion } = req.body;
        if (!nombre ||!clasificacion ||!descripcion) { 
            return res.status(400).send("Todos los campos son obligatorios");
        }
        const newProducto = {
            nombre,
            clasificacion,
            descripcion,
            imagen: req.file? req.file.filename : 'default.jpg'
        };

        const result = await productosController.insert(newProducto);
        res.status(201).send(result);
    }catch(error){
        if ( error.code === 'ER_NO_REFERENCED_ROW_2' || error.code === 'ER_NO_REFERENCED_ROW' ) {
            return res.status(400).send('No se puede eliminar un producto que está en uso en otra tabla');
        }
        console.error('Error al insertar un producto: ', error);
        res.status(500).json({message: 'Error al insertar el producto'});
    }
});

// actualizar un producto

ruta.put('/update/:id', async (req, res) => {  
    const id = req.params.id;
    try { 
        const { nombre, clasificacion, descripcion } = req.body;
        if (!nombre ||!clasificacion ||!descripcion) {
            return res.status(400).send("Todos los campos son obligatorios");
        }
        const updatedProducto = {
            nombre,
            clasificacion,
            descripcion,
            imagen: req.file? req.file.filename : null
        };
        const result = await productosController.update(updatedProducto);
        res.status(200).send(result);
    }catch (error) {
        if ( error.code === 'ER_NO_REFERENCED_ROW_2' || error.code === 'ER_NO_REFERENCED_ROW' ) {
            return res.status(400).json({ message: 'No se puede actualizar un producto que está en uso en otra tabla'});
        }
        console.error('Error al actualizar un producto: ', error);
        res.status(500).json({message: 'Error al actualizar el producto'});
    }
});

// Eliminar un producto

ruta.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await productosController.delete(id);
        res.status(200).send(result);
    } catch (error) {
        if ( error.code === 'ER_NO_REFERENCED_ROW_2' || error.code === 'ER_NO_REFERENCED_ROW' ) {
            return res.status(400).json({ message: 'No se puede eliminar un producto que está en uso en otra tabla'});
        }
        console.error('Error al eliminar un producto: ', error);
        res.status(500).json({message: 'Error al eliminar el producto'});
    }
});