const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const { validatePurchase } = require('../middleware/validator');

router.get('/', shopController.getShopItems);
router.post('/buy', validatePurchase, shopController.buyItem);

module.exports = router;
