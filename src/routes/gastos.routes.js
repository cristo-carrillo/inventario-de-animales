const { Router } = require('express');
const router = Router();

const {renderGastoForm,createNewGasto,renderGastos,renderEditForm,updateGasto,deleteGasto} = require('../controllers/gastos.controller');

const {isAuthenticated} = require('../helpers/auth');

router.get('/gastos/add/:id',isAuthenticated, renderGastoForm);

router.post('/gastos/new-gasto',isAuthenticated, createNewGasto);

router.get('/gastos/:id',isAuthenticated, renderGastos);

router.get('/gastos/edit/:id',isAuthenticated, renderEditForm);

router.put('/gastos/edit/:id',isAuthenticated, updateGasto);

router.delete('/gastos/delete/:id',isAuthenticated, deleteGasto)

module.exports = router