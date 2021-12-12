const express = require('express');
const authToken = require('../middleware/auth-token');
const consultDocumentsController = require('../controllers/myConsultDocumentsFound-controller');
const router = express.Router();

router.get('/',authToken.njwtAuth, consultDocumentsController.myConsultDocumentsFound);

module.exports = router; 