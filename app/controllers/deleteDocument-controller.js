const db = require("../db/mysql");

let deleteDocument = (req, res) => {
  db.deleteDocument(req.query)
    .then((result) => {
      return res.status(200).json({
        status: "Ok",
        delete: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
    deleteDocument,
};
