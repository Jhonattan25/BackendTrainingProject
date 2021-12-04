const express = require('express');
const authToken = require('../middleware/auth-token');
const updateDocumentValidator = require('../middleware/addDocuments-validator');
const updateDocumentController = require('../controllers/updateDocument-controller');
const router = express.Router();

router.put('/',authToken.njwtAuth, updateDocumentValidator.validatorParams, updateDocumentValidator.validator, updateDocumentController.updateDocument);

module.exports = router; 