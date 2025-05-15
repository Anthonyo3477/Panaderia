const { Router } = require('express');
const routes = Router();

// Importar rutas
const indexRoutes = require('./index.routes');
const pedidoRoutes = require('./pedido.routes');
const clienteRoutes = require('./cliente.routes');
const adminRoutes = require('./admin.routes');
const authRoutes = require('./auth.routes');

// Añadir rutas
routes.use('/', indexRoutes);
routes.use('/pedidos', pedidoRoutes);
routes.use('/clientes', clienteRoutes);
routes.use('/admins', adminRoutes);
routes.use('/auth', authRoutes);

module.exports = routes;