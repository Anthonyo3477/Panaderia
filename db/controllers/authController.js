const db = require('../db/Conexion');

exports.mostrarFormularioLogin = (req, res) => {
  res.render('Login_Registrar');
};

exports.login = (req, res) => {
  const { correo, contrasena } = req.body;
  db.query('SELECT * FROM cliente WHERE correo = ? AND contrasena = ?', [correo, contrasena], (err, resultados) => {
    if (err) throw err;
    if (resultados.length > 0) {
      res.redirect('/');
    } else {
      res.send('Credenciales incorrectas');
    }
  });
};

exports.registrar = (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  db.query('INSERT INTO cliente (nombre, correo, contrasena) VALUES (?, ?, ?)', [nombre, correo, contrasena], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
};
