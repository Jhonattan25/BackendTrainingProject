const express = require('express');
const addDocumentsValidator = require('../middleware/addDocuments-validator');
const activationController = require('../controllers/activation-controller');
const router = express.Router();

router.put('/',activationController.activation);

module.exports = router; 