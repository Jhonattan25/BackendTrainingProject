//const mysqlConnection = require("../config/mysql");
const db = require("../db/mysql");

let addDocuments = (req, res) => {
  db.addDocuments(req.body)
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
};

module.exports = {
  addDocuments,
};
