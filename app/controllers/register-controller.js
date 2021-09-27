const bcrypt = require("bcryptjs");

let register = (req, res) => {

  let password = req.body.password;
  let hashPass = bcrypt.hashSync(password, 8);
    return res.status(200).json({ 
                            status: 'Successful authentication',
                            cedula: req.body.cedula,
                            nombre: req.body.nombre,
                            password: hashPass
                          });
  }


module.exports = {
register
}
