const express = require('express');
const authToken = require('../middleware/auth-token');
const updateDataValidator = require('../middleware/updateData-validator');
const updateDataController = require('../controllers/updateData-controller');
const router = express.Router();

router.put('/',authToken.njwtAuth,updateDataValidator.validatorParams,updateDataValidator.validator,updateDataController.updateData);

module.exports = router; 