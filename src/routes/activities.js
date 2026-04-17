const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activitiesController');
const { validateActivity } = require('../middleware/validator');

router.get('/', activitiesController.getAllActivities);
router.get('/:id', activitiesController.getActivityById);
router.post('/:id/play', validateActivity, activitiesController.playActivity);

module.exports = router;
