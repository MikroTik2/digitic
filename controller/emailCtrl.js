const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kirstin.oconnell@ethereal.email',
        pass: 'cv4W1na5aFFCUeb95G'
    }
  });

  const info = await transporter.sendMail({
    from: '"Hey 👻" <abc@gmail.com.com>', // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  });

  console.log("Message sent:", info.messageId);
  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

});


module.exports = sendEmail;