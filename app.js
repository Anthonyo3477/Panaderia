const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.get('/', (req, res) => {
    res.render('Index', { title: 'Inicio' });
});

app.get('/Panaderia', (req, res) => {
    res.render('Panaderia', { title: 'Panadería' });
});

app.get('/Reposteria', (req, res) => {
    res.render('Reposteria', { title: 'Repostería' });
});

app.get('/Carro', (req, res) => {
    res.render('Carro', { title: 'Carro de Compras' });
});

app.get('/Login_Registrar', (req, res) => {
    res.render('Login_Registrar', { title: 'Iniciar Sesión' });
});

app.get('/AgregarProducto', (req, res) => {
    res.render('AgregarProducto', { title: 'Registrar Producto' });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
