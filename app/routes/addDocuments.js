const express = require('express');
const addDocumentsValidator = require('../middleware/addDocuments-validator');
const addDocumentsController = require('../controllers/addDocuments-controller');
const router = express.Router();

router.post('/', addDocumentsValidator.validatorParams, addDocumentsValidator.validator, addDocumentsController.addDocuments);

module.exports = router; 