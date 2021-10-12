const db = require("../db/mysql");
const bcrypt = require("bcryptjs");

let register = async (req, res) => {
  let hashPass = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashPass;

  await db.registerUser(req.body)
  .then((result) => {
    return res.status(200).json({
      status: "Successful registration",
      reg: true
    });
  })
  .catch((err) => {
    console.log(err);
  });
};

module.exports = {
  register,
};
