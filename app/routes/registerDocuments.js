const express = require('express');
const registerDocumentsValidator = require('../middleware/registerDocuments-validator');
const registerDocumentsController = require('../controllers/registerDocuments-controller');
const router = express.Router();

router.post('/', registerDocumentsValidator.validatorParams, registerDocumentsValidator.validator, registerDocumentsController.registerLostDocuments);

module.exports = router; 