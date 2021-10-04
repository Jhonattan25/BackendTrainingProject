const express = require('express');
const authToken = require('../middleware/auth-token');
const consultDocumentsController = require('../controllers/consultDocuments-controller');
const router = express.Router();

router.get('/',authToken.njwtAuth, consultDocumentsController.consultDocuments);

module.exports = router; 