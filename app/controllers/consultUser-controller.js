const db = require("../db/mysql");
const config = require("../config/keys");
const nJwt = require("njwt");

let consultUser = (req, res) => {
    let sub = req.header("Authorization").split(" ");
    let token = sub[1];
    nJwt.verify(token, config.SIGNING_KEY, function (err, decoded) {  
      let identificationNumber = decoded.body.identificationNumber;
      db.consultUser(identificationNumber)
      .then((result) => {
        return res.status(200).json({
          status: "okey",
          auth: true,
          user: result[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });

   })


};

module.exports = {
    consultUser,
};
