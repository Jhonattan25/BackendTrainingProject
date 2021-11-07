const express = require('express');
const consultCitiesController = require('../controllers/consultCities-controller');
const router = express.Router();

router.get('/', consultCitiesController.consultCities);

module.exports = router; 