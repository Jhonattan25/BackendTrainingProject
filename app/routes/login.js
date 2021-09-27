const express = require('express');
const loginController = require('../controllers/login-controller');
const loginValidator = require('../middleware/login-validator');
const router = express.Router();

router.post('/', loginValidator.validatorParams, loginValidator.validator, loginController.login);

module.exports = router; 