const db = require("../db/mysql");

let consultDocuments = (req, res) => {
  db.consultDocuments(req.query)
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
  consultDocuments,
};
