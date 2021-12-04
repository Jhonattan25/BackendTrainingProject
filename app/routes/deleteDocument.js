const express = require('express');
const authToken = require('../middleware/auth-token');
const deleteDocumentController = require('../controllers/deleteDocument-controller');
const router = express.Router();

router.delete('/',authToken.njwtAuth, deleteDocumentController.deleteDocument);

module.exports = router; 