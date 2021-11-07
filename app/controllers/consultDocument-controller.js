const db = require("../db/mysql");

let consultDocument = (req, res) => {
  db.consultDocument(req.query)
    .then((result) => {
      return res.status(200).json({
        status: "Ok",
        consult: true,
        document: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  consultDocument,
};
