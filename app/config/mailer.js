const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Server de Microsoft: smtp.live.com: 587
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER, // generated ethereal user  (reportdocument@hotmail.com)
    pass: process.env.MAIL_PASSWORD, // generated ethereal password  (rwlcfvalfxpzavfs)
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Ready for send emails");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = transporter;