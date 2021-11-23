const express = require('express');
const consultDocumentType = require('../controllers/consultDocumentType-controller');
const router = express.Router();

router.get('/', consultDocumentType.consultDocumentType);

module.exports = router; 