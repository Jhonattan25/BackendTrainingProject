const db = require("../db/mysql");
const bcrypt = require("bcryptjs");

let register = (req, res) => {
  let hashPass = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashPass;

  db.registerUser(req.body)
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
  register,
};
