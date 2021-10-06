const db = require("../db/mysql");
const bcrypt = require("bcryptjs");
const nJwt = require("njwt");
const config = require("../config/keys");

let login = async (req, res) => {
  let identificationNumber = req.body.identificationNumber;
  let password = req.body.password;
  let result = await db.login(req.body);
  console.log(result);

  if (result.length > 0) {
    if (!bcrypt.compareSync(password, result[0].password)) {
      return res.status(401).json({
        status: "Authentication failed",
        auth: false,
      });
    }
  } else {
    return res.status(401).json({
      status: "Authentication failed",
      auth: false,
    });
  }

  // TOKEN
  let jwt = nJwt.create(
    { identificationNumber: identificationNumber },
    config.SIGNING_KEY
  );
  jwt.setExpiration(new Date().getTime() + 2 * 60 * 1000);
  let token = jwt.compact();
  return res.status(200).json({
    status: "Successful login",
    auth: true,
    token: token,
  });
};

module.exports = {
  login,
};
