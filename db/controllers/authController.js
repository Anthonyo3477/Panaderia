const db = require('../Conexion.js');

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

  // en esta linea hay error con el dato "nombre" ya que me dice qeu es undifind
  const { nombre, correo, contraseña, telefono, direccion } = req.body;
  db.query('INSERT INTO cliente (nombre, correo, contraseña, telefono, direccion  ) VALUES ( ?, ?, ?, ?, ?)', [ nombre, correo, contraseña, telefono, direccion], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
  if (!nombre || !correo || !contraseña || !telefono ||!direccion) {
    return res.status(400).send("Faltan campos del formulario");
  }
  res.send("Usuario registrado correctamente");
};
