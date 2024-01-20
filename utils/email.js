const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMIAL_PORT,
    auth: {
      user: process.env.EMAIL_PASS,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "Movie Zila ",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;
