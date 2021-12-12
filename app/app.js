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
const updateDate = require('./routes/updateData');
const consultUser = require('./routes/consultUser'); 
const consultCity = require('./routes/consultCities'); 
const consultDocument = require('./routes/consultDocument'); 
const consultDocumentType = require('./routes/consultDocumentType'); 
const updateDocument = require('./routes/updateDocument');
const deleteDocument = require('./routes/deleteDocument');
const myConsultDocuments = require('./routes/myConsultDocuments'); 
const myConsultDocumentsFound = require('./routes/myConsultDocumentsFound');  


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
  app.use('/updateData', updateDate);
  app.use('/consultUser', consultUser);
  app.use('/consultCities', consultCity);
  app.use('/consultDocument', consultDocument);
  app.use('/consultDocumentType', consultDocumentType);
  app.use('/updateDocument', updateDocument);
  app.use('/deleteDocument', deleteDocument);
  app.use('/myConsultDocuments', myConsultDocuments);
  app.use('/myConsultDocumentsFound', myConsultDocumentsFound);

app.get('/home', (req, res) =>{
  res.send('Welcome to Report Documents');
});

module.exports = app;