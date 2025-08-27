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
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const {
    nombre,
    apellido,
    email,
    numero_telefono,
    rol_empresa,
    sujeto,
    mensaje,
    num_empleados,
    nombre_empresa,
  } = req.body || {};

  try {
    const acknowledgmentMailOptions = {
      from: myemail,
      to: email,
      subject: '¡Gracias por solicitar una prueba de SharetoGo! ✅',
      text: `Hola ${nombre} ${apellido},\n\nHemos recibido tu solicitud de prueba. Estos son los datos que nos has enviado:\n\nNombre: ${nombre}\nApellido: ${apellido}\nNombre de la empresa: ${nombre_empresa}\nCorreo corporativo: ${email}\nNúmero de teléfono: ${numero_telefono}\nRol dentro de la empresa: ${rol_empresa}\nNúmero de trabajadores: ${num_empleados}\nMensaje: ${mensaje}\n\nNos pondremos en contacto contigo en breve.\n\nEquipo de SharetoGo`,
    };

    await transporter.sendMail(acknowledgmentMailOptions);

    const detailsForTeam = {
      from: myemail,
      to: myemail,
      subject: sujeto || 'Nueva solicitud de prueba - SharetoGo',
      text: `Nueva solicitud de prueba recibida:\n\nNombre: ${nombre}\nApellido: ${apellido}\nNombre de la empresa: ${nombre_empresa}\nCorreo corporativo: ${email}\nNúmero de teléfono: ${numero_telefono}\nRol dentro de la empresa: ${rol_empresa}\nNúmero de trabajadores: ${num_empleados}\nMensaje: ${mensaje}`,
      html: `<h3>Nueva solicitud de prueba recibida</h3>
<p><strong>Nombre:</strong> ${nombre}</p>
<p><strong>Apellido:</strong> ${apellido}</p>
<p><strong>Nombre de la empresa:</strong> ${nombre_empresa}</p>
<p><strong>Correo corporativo:</strong> ${email}</p>
<p><strong>Número de teléfono:</strong> ${numero_telefono}</p>
<p><strong>Rol dentro de la empresa:</strong> ${rol_empresa}</p>
<p><strong>Número de trabajadores:</strong> ${num_empleados}</p>
<p><strong>Mensaje:</strong><br/>${mensaje}</p>`,
    };

    await transporter.sendMail(detailsForTeam);

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error sending contratar email:', error);
    res.status(500).send('Internal Server Error');
  }
}
