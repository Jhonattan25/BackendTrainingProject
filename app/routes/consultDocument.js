const express = require('express');
const consultDocumentValidator = require('../middleware/consultDocument-validator');
const consultDocumentController = require('../controllers/consultDocument-controller');
const router = express.Router();

router.get('/', consultDocumentValidator.validatorParams, consultDocumentValidator.validator, consultDocumentController.consultDocument);

module.exports = router; 