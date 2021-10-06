const express = require('express');
const loginValidator = require('../middleware/login-validator');
const loginController = require('../controllers/login-controller');
const router = express.Router();

router.post('/', loginValidator.validatorParams, loginValidator.validator, loginController.login);

module.exports = router; 