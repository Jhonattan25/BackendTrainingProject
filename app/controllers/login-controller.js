const nJwt = require("njwt");
const config = require('../config/keys');



let login = (req, res) => {
   let jwt = nJwt.create({ cedula: req.body.cedula}, config.SIGNING_KEY);
   jwt.setExpiration(new Date().getTime() + 2 * 60 * 1000);
   let token = jwt.compact();
    return res.status(200).json({ 
                            status: 'Successful login',
                            token: token,
                            cedula: req.body.cedula,
                            password: req.body.password
                          });
  }


module.exports = {
login
}
