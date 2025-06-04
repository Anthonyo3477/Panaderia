const express = require('express');
const router = express.Router();
const authController = require('../../db/controllers/authController.js');

router.get('/login', authController.mostrarFormularioLogin);
router.post('/login', authController.login);
router.post('/registrar', authController.registrar);

router.post('/registrar', (req, res) => {
    const { nombre, correo, contrasena, telefono, direccion } = req.body;

    // Validaciones, inserción en base de datos
    if (!nombre || !correo || !contrasena || !telefono || !direccion) {
        return res.status(400).send('Todos los campos son obligatorios');
    }
    res.redirect('/login');
    res.status(500).send('Error al registrar el usuario');
    res.redirect('/login');
    res.status(500).send('Error al registrar el usuario');
    res.send('Usuario registrado exitosamente');
});

module.exports = router;
