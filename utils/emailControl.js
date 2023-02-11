// external import 
const nodemailer = require("nodemailer");


const sendMail = async(data, req, res) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: 'paul.schamberger93@ethereal.email',
          pass: 'V11xaPBkYN8zJQspJU'
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Hi 👻" <mohammadmarufgazi@gmail.com>', // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: data.html, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}

module.exports = sendMail;