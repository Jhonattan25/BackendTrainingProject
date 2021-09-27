const express = require('express');
const registerFoundDocumentsController = require('../controllers/registerFoundDocuments-controller');
const registerFoundDocumentsValidator = require('../middleware/registerFoundDocuments-validator');
const router = express.Router();

router.post('/', registerFoundDocumentsValidator.validatorParams, registerFoundDocumentsValidator.validator, registerFoundDocumentsController.registerFoundDocuments);


module.exports = router; 