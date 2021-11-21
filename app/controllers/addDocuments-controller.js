const db = require("../db/mysql");
const nJwt = require("njwt");
const config = require("../config/keys");

let addDocuments = (req, res) => {
  let sub = req.header("Authorization").split(" ");
  let token = sub[1];
  console.log(token);
  nJwt.verify(token, config.SIGNING_KEY, function (err, decoded) {
    if (!err)
      req.body["userIdentificationNumber"] = decoded.body.identificationNumber;

    db.addDocuments(req.body)
      .then((result) => {
        return res.status(200).json({
          status: "Documents added successfully",
          add: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports = {
  addDocuments,
};
