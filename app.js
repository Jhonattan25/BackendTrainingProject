const SIGNING_KEY =
  "oqLlmSRa5j3Y8YEYRsYrgO9ubTS2wv/ENuMCpm5HX555ef4aRPkceYru1lTuvccXm1dT73QuU3nqB5aRzq4nDVKpFSQs3oXvFSEEk2XNt2RPgMPTDWPU2h3Fblc5nDxLJHKRqsXDgncc/8aOXmGrMp2+SruMuz3NTFUf0YlyB+Fwb8z+hnK7JN4uszxO//72d4tcrs0xbuv4ke+2WXUN5ROu4/2nky0eJUP38/VH41jifprI0EHfrrt2aY3O9FvH5vFWT2NHmPJBz7ZVl6zoKB4ja1D03ZklOD/zJuYTNRUBo+2zaHyjmmvOFkvG3NiCtlguIM0tpgwV468eM2KKTQ==";
var express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
var mysql = require("mysql");
const nJwt = require("njwt");

var app = express()
  .use(cors({ credentials: true, origin: "http://localhost:4200" }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json());

app.post("/register", function (req, res) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sistemas",
    database: "trainingproject",
  });
  connection.connect((err) => {
    if (err) throw err;
    //console.log('Connected to MySQL Server!');
  });
  let cedula = req.body.cedula;
  let nombre = req.body.nombre;
  let email = req.body.email;
  let password = req.body.password;
  let hashPass = bcrypt.hashSync(password, 8);
  let idCiudad = req.body.idCiudad;
  let insert =
    "INSERT INTO funcionario(cedula,nombre,email,password,idCiudad) VALUES(?,?,?,?,?)";
  let query = mysql.format(insert, [cedula, nombre, email, hashPass, idCiudad]);
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log("Insert funcionario: ok");
    connection.end();

    return res.status(201).json({
      Status: "ok funcionario registrado",
      reg: true,
      Nombre: nombre,
      password: hashPass,
    });
  });
});

app.post("/login", function (req, res) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sistemas",
    database: "trainingproject",
  });
  connection.connect((err) => {
    if (err) throw err;
    //console.log('Connected to MySQL Server!');
  });
  let cedula = req.body.cedula;
  let password = req.body.password;

  let select = "SELECT cedula, password FROM funcionario WHERE cedula=?";
  let query = mysql.format(select, [cedula]);
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log("---------- ", result);

    if (result.length > 0) {
      if (!bcrypt.compareSync(password, result[0].password)) {
        return res
          .status(401)
          .send({ status: "authentication failed", auth: false });
      }
    } else {
      return res
        .status(401)
        .send({ status: "authentication failed", auth: false });
    }
    connection.end();

    //TOKEN
    let jwt = nJwt.create({ cedula: result[0].cedula }, SIGNING_KEY);
    jwt.setExpiration(new Date().getTime() + 2 * 60 * 1000);
    let token = jwt.compact();
    return res.status(200).json({
      Status: "authentication ok",
      token: token,
      auth: true,
    });
  });
});

//* Registro documentos perdidos
app.post("/registerLostDocuments", function (req, res) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sistemas",
    database: "trainingproject",
  });
  connection.connect((err) => {
    if (err) throw err;
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
  let insert =
    "INSERT INTO reportedocumento(numDocumento,nombreCompleto,email,descripcion,fecha,estado,perdido,cedulaFuncionario,idCiudad) VALUES(?,?,?,?,?,?,?,?,?)";
  let query = mysql.format(insert, [
    numDocumento,
    nombreCompleto,
    email,
    descripcion,
    fecha,
    estado,
    perdido,
    cedulaFuncionario,
    idCiudad,
  ]);
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log("Insert documento: ok");
    connection.end();

    return res.status(201).json({
      Status: "ok documento perdido registrado",
      reg: true,
      Nombre: nombreCompleto,
      "Numero documento": numDocumento,
    });
  });
});

app.get("/lostDocuments", function (req, res) {
  if (!req.header("Authorization")) {
    return res.status(403).send({
      status: "authentication failed",
      auth: false,
      message: "No token provided",
    });
  }

  let sub = req.header("Authorization").split(" ");
  let token = sub[1];

  nJwt.verify(token, SIGNING_KEY, function (err, decoded) {
    if (err) {
      return res.status(403).send({
        status: "authentication failed",
        auth: false,
        message: "No token provided",
      });
    }
    let perdido = 1;
    cedula = decoded.body.cedula;

    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "sistemas",
      database: "trainingproject",
    });

    connection.connect((err) => {
      if (err) throw err;
      //console.log('Connected to MySQL Server!');
    });

    let select = "SELECT * FROM reportedocumento WHERE perdido=?";
    let query = mysql.format(select, [perdido]);

    connection.query(query, (err, result) => {
      if (err) throw err;

      connection.end();

      console.log(result.fecha);
      return res.status(200).json({
        Status: "Token ok",
        auth: true,
        documents: result,
      });
    });
  });
});

app.get("/foundDocuments", function (req, res) {
  if (!req.header("Authorization")) {
    return res.status(403).send({
      status: "authentication failed",
      auth: false,
      message: "No token provided",
    });
  }

  let sub = req.header("Authorization").split(" ");
  let token = sub[1];

  nJwt.verify(token, SIGNING_KEY, function (err, decoded) {
    if (err) {
      return res.status(403).send({
        status: "authentication failed",
        auth: false,
        message: "No token provided",
      });
    }
    cedula = decoded.body.cedula;

    return res.status(200).json({
      Status: "Token ok",
      auth: true,
      cedula: cedula,
    });
  });
});

app.listen(10101, function () {
  console.log("Example app listening on port 10101!");
});
