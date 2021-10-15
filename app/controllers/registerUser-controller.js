const db = require("../db/mysql");
const bcrypt = require("bcryptjs");
const transporter = require("../config/mailer");

let register = async (req, res) => {
  let hashPass = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashPass;

  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"Reporte Documentos 👻" <reportdococument@gmail.com>', // sender address
      to: "jhonattan1997@hotmail.com", // list of receivers
      subject: "cliente de correo ✔", // Subject line
      text: "Bienvenido a la pagina web de Documentos Perdidos", // plain text body
      html: `
    <table style="border: 1px solid #ccc">

    <thead>
        <tr>
              <th style="border: 1px solid #ccc">Integrante 1</th>
              <th style="border: 1px solid #ccc">Integrante 2</th>
              <th style="border: 1px solid #ccc">Integrante 3</th>  
        </tr>
    </thead>

    <tr>

      <td style="border: 1px solid #ccc">Jhonattan</td>

      <td style="border: 1px solid #ccc">Vanessa</td>

      <td style="border: 1px solid #ccc">Juan Camilo</td>

    </tr>
    </table>
    `, // html body

    });
    return res.status(200).json({
      status: "Successful registration",
      reg: true
    });
  } catch (error) {
    //emailStatus = error;
    return res.status(400).json({ message: 'Sometring goes wrong' });
  }



  /**   db.registerUser(req.body)
    .then((result) => {
      return res.status(200).json({
        status: "Successful registration",
        reg: true
      });
    })
    .catch((err) => {
      console.log(err);
    });
    */
};

module.exports = {
  register,
};
