const db = require("../db/mysql");

let consultDocumentType = (req, res) => {
  db.consultDocumentType()
    .then((result) => {
      return res.status(200).json({
        status: "Ok",
        documentType: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
    consultDocumentType,
};