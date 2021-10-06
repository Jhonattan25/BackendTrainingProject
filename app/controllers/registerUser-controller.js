const db = require("../db/mysql");
const bcrypt = require("bcryptjs");

let register = (req, res) => {
  let hashPass = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashPass;

  db.registerUser(req.body);

  return res.status(200).json({
    status: "Successful registration",
    reg: true,
    password: req.body.password,
  });
};

module.exports = {
  register,
};
