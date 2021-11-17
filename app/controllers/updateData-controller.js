const db = require("../db/mysql");

let updateData = (req, res) => {
  db.updateData(req.body)
    .then((result) => {
      return res.status(200).json({
        status: "Token ok",
        auth: true,
       // documents: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
    updateData,
};
