const { Router } = require('express');
const router = Router();

const {renderAnimalForm,createNewAnimal,renderanimales,renderEditForm,updateAnimal,deleteAnimal} = require('../controllers/animales.controller');

router.get('/animales/add', renderAnimalForm);

router.post('/animales/new-animal', createNewAnimal);

router.get('/animales/', renderanimales);

router.get('/animales/edit/:id', renderEditForm);

router.put('/animales/edit/:id', updateAnimal);

router.delete('/animales/delete/:id', deleteAnimal)

module.exports = router