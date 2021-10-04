const mysqlConnection = require("../config/mysql");
const bcrypt = require("bcryptjs");

let register = (req, res) => {
  let hashPass = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashPass;

  let insert = `INSERT INTO ${process.env.TABLE_USER} SET ?`;
  let query = mysqlConnection.format(insert, req.body);
  mysqlConnection.query(query, (error, result) => {
    if (error) throw error;
    return res.status(200).json({
      status: "Successful registration",
      reg: true,
      password: req.body.password,
    });
  });
};

module.exports = {
  register,
};
