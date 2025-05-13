const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de EJS y vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración adicional para archivos estáticos
app.use('/css', express.static(path.join(__dirname, 'public/css')));

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
    res.render('Login_Registrar', { title: 'Iniciar Sesión / Registrarse' });
});

// Ruta para manejar errores 404
app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});