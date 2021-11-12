const express = require('express');
const authToken = require('../middleware/auth-token');
const consultUserController = require('../controllers/consultUser-controller');
const router = express.Router();

router.get('/',authToken.njwtAuth,consultUserController.consultUser);

module.exports = router; 