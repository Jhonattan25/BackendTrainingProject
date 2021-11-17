require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const cookieParser = require('cookie-parser');

const registerUser = require('./routes/registerUser'); 
const login = require('./routes/login'); 
const addDocuments = require('./routes/addDocuments');
const consultDocuments = require('./routes/consultDocuments'); 
const activation = require('./routes/activation');
const consultCity = require('./routes/consultCities'); 
const consultDocument = require('./routes/consultDocument'); 

const app = express()
  .use(cors({ credentials: true, origin: "http://localhost:4200" }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(bearerToken());

app.use('/registerUser', registerUser);
app.use('/login', login);
app.use('/addDocuments', addDocuments);
app.use('/consultDocuments', consultDocuments);
app.use('/activation', activation);
app.use('/consultCities', consultCity);
app.use('/consultDocument', consultDocument);


app.get('/home', (req, res) =>{
  res.send('Welcome to Report Documents');
});

module.exports = app;