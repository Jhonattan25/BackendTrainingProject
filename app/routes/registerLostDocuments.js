const express = require('express');
const registerLostDocumentsController = require('../controllers/registerLostDocuments-controller');
const registerLostDocumentsValidator = require('../middleware/registerLostDocuments-validator');
const router = express.Router();

router.post('/', registerLostDocumentsValidator.validatorParams, registerLostDocumentsValidator.validator, registerLostDocumentsController.registerLostDocuments);

module.exports = router; 