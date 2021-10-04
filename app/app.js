require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const cookieParser = require('cookie-parser');

const register = require('./routes/register'); 
const login = require('./routes/login'); 
const registerLostDocuments = require('./routes/registerLostDocuments'); 
const registerFoundDocuments = require('./routes/registerFoundDocuments'); 
const lostDocuments = require('./routes/lostDocuments'); 

const app = express()
  .use(cors({ credentials: true, origin: "http://localhost:4200" }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(bearerToken());

app.use('/register', register);
app.use('/login', login);
app.use('/registerLostDocuments', registerLostDocuments);
app.use('/registerFoundDocuments', registerFoundDocuments);
app.use('/lostDocuments', lostDocuments);

module.exports = app;