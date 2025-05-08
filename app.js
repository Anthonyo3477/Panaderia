const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


// Establecer EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas estáticas
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
////////////////////////////////////////////////////////////////////////////

// Rutas
//const express = require('express');
//const path = require('path');

// Configurar motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use('/css', express.static(path.join(__dirname, 'public/css')));
////////////////////////////////////////////////////////////////////////////
// Rutas
app.get('/', (req, res) => {
    res.render('Index', { title: 'Inicio' });
});

app.get('/Panaderia', (req, res) => {
    res.render('Panaderia', { title: 'Panadería' });
});

app.get('/Reposteria', (req, res) => {
    res.render('Reposteria', { title: 'Repostería' });
});
//////////////////////////////////////////////////////////
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
