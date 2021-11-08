const { Router } = require('express');
const router = Router();

const {renderAnimalForm,createNewAnimal,renderanimales,renderEditForm,updateAnimal,deleteAnimal} = require('../controllers/animales.controller');

const {isAuthenticated} = require('../helpers/auth');

router.get('/animales/add',isAuthenticated, renderAnimalForm);

router.post('/animales/new-animal',isAuthenticated, createNewAnimal);

router.get('/animales/',isAuthenticated, renderanimales);

router.get('/animales/edit/:id',isAuthenticated, renderEditForm);

router.put('/animales/edit/:id',isAuthenticated, updateAnimal);

router.delete('/animales/delete/:id',isAuthenticated, deleteAnimal)

module.exports = router