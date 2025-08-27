import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const myemail = process.env.EMAIL;
const appPassword = process.env.APP_PASSWORD;

if (!myemail || !appPassword) {
  console.error('Please set EMAIL and APP_PASSWORD environment variables.');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nombre, apellido, email, sujeto, mensaje } = req.body;

    try {
      const acknowledgmentMailOptions = {
        from: myemail,
        to: email,
        subject: '¡Gracias por contactar con nosotros! ✅',
        text: `Hola ${nombre} ${apellido},\n\nHemos recibido tu mensaje. Estos son los datos que nos has enviado:\n\nNombre: ${nombre}\nApellido: ${apellido}\nCorreo electrónico: ${email}\nAsunto: ${sujeto}\nMensaje: ${mensaje}\n\nNos pondremos en contacto contigo en breve.\n\nEquipo de SharetoGo`,
      };

      await transporter.sendMail(acknowledgmentMailOptions);

      const mailOptions = {
        from: email,
        to: myemail,
        subject: sujeto,
        text: `${nombre} ${apellido} acaba de enviar un correo electrónico\n\n "${mensaje}"\n\nResponde a través de este correo electrónico: ${email}`,
        html: `<p>${nombre} ${apellido} acaba de enviar un correo electrónico</p>\n\n <p>"${mensaje}"</p>\n\n<p>Responde a través de este correo electrónico: ${email}</p>`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);

      res.status(200).send('OK');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}