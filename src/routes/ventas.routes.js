const { Router } = require('express');
const router = Router();

const {renderVentaForm,createNewVenta,renderVentas} = require('../controllers/ventas.controller');

const {isAuthenticated} = require('../helpers/auth');

router.get('/ventas/add/:id/:cantidad',isAuthenticated, renderVentaForm);

router.post('/ventas/new-venta',isAuthenticated, createNewVenta);

router.get('/ventas/:id',isAuthenticated, renderVentas);

module.exports = router