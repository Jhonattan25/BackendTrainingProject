const express = require('express');
const authToken = require('../middleware/auth-token');
const lostDocumentsController = require('../controllers/lostDocuments-controller');
const router = express.Router();

router.get('/',authToken.njwtAuth, lostDocumentsController.lostDocuments);

module.exports = router; 