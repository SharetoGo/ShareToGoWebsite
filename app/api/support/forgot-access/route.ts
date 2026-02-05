import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { userEmail, reason } = await req.json();

    if (!userEmail || !reason) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    // Configura el transporte SMTP (puedes usar Gmail u otro proveedor)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "contactosharetogo@gmail.com", // el correo desde el que se envía
        pass: process.env.GMAIL_APP_PASSWORD, // usa una contraseña de aplicación
      },
    });

    // Contenido del correo
    const mailOptions = {
      from: `"ShareToGo Soporte" <contactosharetogo@gmail.com>`,
      to: "contactosharetogo@gmail.com", // el destino
      subject: "Solicitud de recuperación de acceso",
      text: `
Nueva solicitud de recuperación de acceso:

Correo del usuario: ${userEmail}
Motivo: ${reason}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error enviando correo:", error);
    return NextResponse.json({ error: "Error enviando correo" }, { status: 500 });
  }
}
