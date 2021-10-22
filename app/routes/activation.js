const express = require('express');
const activationValidator = require('../middleware/activation-validator');
const activationController = require('../controllers/activation-controller');
const router = express.Router();

router.put('/', activationValidator.validatorParams, activationValidator.validator, activationController.activation);

module.exports = router; 