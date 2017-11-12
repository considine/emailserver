
module.exports = function (emailAddress, emailName, emailPassword, emailService, subject, html, to) {
  const EMAIL = "jackconsidine3@gmail.com";
  const nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
   service: emailService,
   auth: {
          user: emailAddress,
          pass: emailPassword
      }
  });

  const mailOptions = {
    from: emailName + ' <' + emailAddress + ">", // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: html// plain text body
  };
  return new Promise(function(resolve, reject) {
    transporter.sendMail(mailOptions, function (err, info) {
       if(err)
         reject(err);
       else
         resolve(info);
    });
  });

}
