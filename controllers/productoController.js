const db = require('../db/Conexion');

exports.listarProductos = (req, res) => {
    db.query('SELECT * FROM producto', (err, resultados) => {
        if (err) throw err;
        res.render('Panaderia', { productos: resultados });
    });
};

exports.mostrarFormularioAgregar = (req, res) => {
    res.render('AgregarProducto');
};

exports.agregarProducto = (req, res) => {
    const { nombre, clasificacion, descripcion } = req.body;
    const imagen = req.file ? req.file.filename : 'default.jpg';
    db.query('INSERT INTO producto (nombre, clasificacion, descripcion, imagen) VALUES (?, ?, ?, ?)', [nombre, clasificacion, descripcion, imagen], (err) => {
        if (err) throw err;
        res.redirect('/producto/listar');
    });
};
