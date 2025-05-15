const { Router } = require('express');
const adminController = require('../../db/controllers/adminController');
const rutas = Router();
const con = require('../../db/Conexion.js');

const mensajeError = 'Error en el archivo de rutas de administradores';

//Ruta para mostrar la lista de administradores
rutas.get("/", function(req, res) {
    con.query('SELECT * FROM administradores', function(err, result, fields) {
        if (err) {
            console.log(mensajeError);
            res.status(500).send(mensajeError);
        } else {
            res.render('admin/administradores', { administradores: result });
        }
    });
});
