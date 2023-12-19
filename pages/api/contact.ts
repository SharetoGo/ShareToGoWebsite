import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const myemail = process.env.EMAIL;
const appPassword = process.env.APP_PASSWORD;

if (!myemail || !appPassword) {
  console.error('Please set EMAIL and APP_PASSWORD environment variables.');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: myemail,
    pass: appPassword,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nombre, apellido, email, sujeto, mensaje } = req.body;

    try {
      const acknowledgmentMailOptions = {
        from: myemail,
        to: email,
        subject: 'Thank you for contacting us!',
        text: `Hello ${nombre} ${apellido},\n\nThank you for reaching out. We have received your message and will get back to you shortly.\n\nBest regards,\nSharetoGo Team`,
      };

      await transporter.sendMail(acknowledgmentMailOptions);

      const mailOptions = {
        from: email,
        to: myemail,
        subject: sujeto,
        text: `${nombre} ${apellido} just sent a message\n "${mensaje}"\n\nreply to them through this: ${email}`,
        html: `<p>${nombre} ${apellido} just sent a message\n "${mensaje}"\n\nreply to them through this: ${email}</p>`,
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