var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
var mysql = require('mysql');

var app = express()
.use(cors({credentials: true, origin: 'http://localhost:4200'
}))
.use(bodyParser.urlencoded({extended: false}))
.use(bodyParser.json());

app.post('/register', function (req, res) {
  const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'trainingproject'
  });
  connection.connect((err) => {
    if(err) throw err;
    //console.log('Connected to MySQL Server!');
  });
  let cedula = req.body.cedula;
  let nombre = req.body.nombre;
  let email = req.body.email;
  let password = req.body.password;
  let hashPass = bcrypt.hashSync(password, 8);
  let idCiudad = req.body.idCiudad;
  let insert = 'INSERT INTO funcionario(cedula,nombre,email,password,idCiudad) VALUES(?,?,?,?,?)';   
  let query = mysql.format(insert,[cedula,nombre,email,hashPass,idCiudad]);
  connection.query(query, (err, result) => {
    if(err) throw err;
    console.log('Insert funcionario: ok');
    connection.end();

    return res.status(201).json({
      "Status": "ok funcionario registrado", 
      "reg": true,
      "Nombre": nombre,
      "password": hashPass
    });
  });
});

app.post('/login', function (req, res) {
  const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'sistemas',
    database : 'trainingproject'
  });
  connection.connect((err) => {
    if(err) throw err;
    //console.log('Connected to MySQL Server!');
  });
  let cedula = req.body.cedula;
  let password = req.body.password;

  let select = 'SELECT cedula, password FROM funcionario WHERE cedula=?';   
  let query = mysql.format(select,[cedula]);
  connection.query(query, (err, result) => {
    if(err) throw err;
    console.log("---------- ", result);

    if(result.size > 0){
      if (!bcrypt.compareSync(password, result[0].password)) {
        return res.status(401).send({ status: 'authentication failed', auth: false});
      }
    }else{
      return res.status(401).send({ status: 'authentication failed', auth: false});
    }
    return res.status(200).json({
      "Status": "Login ok",
      "reg": true,
      "cedula": cedula,
      "password": password});
  });
});

//* Registro documentos perdidos
app.post('/registerLostDocuments', function (req, res) {
  const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'trainingproject'
  });
  connection.connect((err) => {
    if(err) throw err;
    //console.log('Connected to MySQL Server!');
  });
  let numDocumento = req.body.numDocumento;
  let nombreCompleto = req.body.nombreCompleto;
  let email = req.body.email;
  let descripcion = req.body.descripcion;
  let fecha = req.body.fecha;
  let estado = req.body.estado;
  let perdido = req.body.perdido;
  let cedulaFuncionario = req.body.cedulaFuncionario;
  let idCiudad = req.body.idCiudad;
  let insert = 'INSERT INTO reportedocumento(numDocumento,nombreCompleto,email,descripcion,fecha,estado,perdido,cedulaFuncionario,idCiudad) VALUES(?,?,?,?,?,?,?,?,?)';   
  let query = mysql.format(insert,[numDocumento,nombreCompleto,email,descripcion,fecha,estado, perdido, cedulaFuncionario,idCiudad]);
  connection.query(query, (err, result) => {
    if(err) throw err;
    console.log('Insert documento: ok');
    connection.end();

    return res.status(201).json({
      "Status": "ok documento perdido registrado", 
      "reg": true,
      "Nombre": nombreCompleto,
      "Numero documento": numDocumento
    });
  });
});

app.listen(10101, function () {
  console.log('Example app listening on port 10101!');
});