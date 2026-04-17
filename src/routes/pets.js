const express = require('express');
const router = express.Router();
const petsController = require('../controllers/petsController');

// Si no estás seguro de si validatePet funciona, coméntalo temporalmente
// const { validatePet } = require('../middleware/validator'); 

router.get('/', petsController.getAllPets);
router.get('/:id', petsController.getPetById);
router.post('/', petsController.createPet); // Quitamos validatePet por ahora
router.put('/:id', petsController.updatePet); // Quitamos validatePet por ahora
router.delete('/:id', petsController.deletePet);
router.patch('/:id/feed', petsController.feedPet);
router.patch('/:id/equip', petsController.equipItem);
router.patch('/:id/play', petsController.playPet);
router.patch('/:id/sleep', petsController.sleepPet); // Agregamos la ruta que faltaba

module.exports = router;