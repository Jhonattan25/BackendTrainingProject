const db = require("../db/mysql");
const config = require("../config/keys");
const nJwt = require("njwt");

let myConsultDocuments = (req, res) => {
    let sub = req.header("Authorization").split(" ");
    let token = sub[1];
    nJwt.verify(token, config.SIGNING_KEY, function (err, decoded) {  
    req.query.identificationNumber = decoded.body.identificationNumber;
  db.myConsultDocuments(req.query)
    .then((result) => {
      return res.status(200).json({
        status: "Token ok",
        auth: true,
        documents: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
    })
};

module.exports = {
    myConsultDocuments,
};
