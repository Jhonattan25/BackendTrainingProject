const db = require("../db/mysql");

let consultCities = (req, res) => {
  db.consultCities()
    .then((result) => {
      return res.status(200).json({
        status: "Ok",
        cities: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  consultCities,
};