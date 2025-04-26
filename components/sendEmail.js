const nodemailer = require('nodemailer');

async function sendWelcomeEmail(email) {
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "76c3b053efbb5e",
          pass: "b081dd61ec598c"
        }
    });

  const mailOptions = {
    from: 'contact@sharetogo.es',
    to: email,
    subject: 'Bienvenidos a ShareToGo',
    text: '¡Gracias por suscribirse!',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.messageId);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
}

module.exports = sendWelcomeEmail;
