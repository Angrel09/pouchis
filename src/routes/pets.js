const express = require('express');
const router = express.Router();
const petsController = require('../controllers/petsController');
const { validatePet } = require('../middleware/validator');

router.get('/', petsController.getAllPets);
router.get('/:id', petsController.getPetById);
router.post('/', validatePet, petsController.createPet);
router.put('/:id', validatePet, petsController.updatePet);
router.delete('/:id', petsController.deletePet);
router.patch('/:id/feed', petsController.feedPet);
router.patch('/:id/equip', petsController.equipItem);
router.patch('/:id/play', petsController.playPet);

module.exports = router;
