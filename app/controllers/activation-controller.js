const db = require("../db/mysql");

let activation = (req, res) => {
  db.activation(req.query)
    .then((result) => {
      return res.status(200).json({
        status: "User activation successfully",
        act: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  activation,
};