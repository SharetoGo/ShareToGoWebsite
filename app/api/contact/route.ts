import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, apellido, email, telefono, asunto, mensaje } = body;

    console.log("📩 API ejecutada con:", body);

    const myemail = process.env.EMAIL;
    const appPassword = process.env.GMAIL_APP_PASSWORD;

    if (!myemail || !appPassword) {
      console.error("❌ ENV variables missing:", myemail, appPassword);
      return new Response(JSON.stringify({ error: "Missing env vars" }), {
        status: 500,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: myemail,
        pass: appPassword,
      },
    });

    // ----------------------------------------------------
    // 1️⃣ Email de confirmación al usuario (profesional + logo)
    // ----------------------------------------------------

    await transporter.sendMail({
      from: `SharetoGo <${myemail}>`,
      to: email,
      subject: "Hemos recibido tu mensaje – SharetoGo",
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #2a2c38;">¡Gracias por contactar con nosotros, ${nombre}!</h2>

        <p>
          Hemos recibido tu mensaje correctamente y nuestro equipo de 
          <strong>SharetoGo</strong> te responderá lo antes posible.
        </p>

        <h3 style="margin-top: 24px; color: #9dd187;">Resumen de tu consulta:</h3>

        <div style="padding: 12px 16px; background: #f7f7f7; border-radius: 8px; margin-top: 10px;">
          <p><strong>Nombre:</strong> ${nombre} ${apellido || ""}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${telefono || "No indicado"}</p>
          <p><strong>Asunto:</strong> ${asunto || "Sin asunto"}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="margin-top: 6px;">${mensaje}</p>
        </div>

        <p style="margin-top: 24px;">
          Gracias por confiar en nosotros.<br/>
          <strong>Equipo SharetoGo</strong>
        </p>

        <hr style="margin-top: 32px; border: none; border-top: 1px solid #ddd;" />

        <div style="text-align: center; margin-top: 16px;">
          <img 
            src="https://www.sharetogo.es/logos/logocoche.png"
            alt="SharetoGo"
            style="width: 140px; opacity: 0.95;"
          />
          <p style="font-size: 12px; color: #777; margin-top: 8px;">
            © ${new Date().getFullYear()} SharetoGo. Todos los derechos reservados.
          </p>
        </div>
      </div>
      `,
    });

    // ----------------------------------------------------
    // 2️⃣ Email interno a SharetoGo (muy estructurado + logo)
    // ----------------------------------------------------

    await transporter.sendMail({
      from: `SharetoGo Web <${myemail}>`,
      to: myemail,
      subject: `📩 Nuevo mensaje de contacto – ${asunto}`,
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #2a2c38; margin-bottom: 8px;">Nuevo mensaje recibido desde la web</h2>
        <p style="margin-top: 0; font-size: 14px; color: #555;">Fecha: ${new Date().toLocaleString()}</p>

        <h3 style="margin-top: 24px; color: #9dd187;">📌 Datos del contacto</h3>

        <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
          <tr><td style="padding: 6px;"><strong>Nombre:</strong></td><td>${nombre} ${apellido || ""}</td></tr>
          <tr><td style="padding: 6px;"><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td style="padding: 6px;"><strong>Teléfono:</strong></td><td>${telefono || "No indicado"}</td></tr>
          <tr><td style="padding: 6px;"><strong>Asunto:</strong></td><td>${asunto}</td></tr>
        </table>

        <h3 style="margin-top: 24px; color: #9dd187;">📝 Mensaje</h3>
        <div style="padding: 12px 16px; background: #f7f7f7; border-radius: 8px;">
          <p>${mensaje}</p>
        </div>

        <h3 style="margin-top: 24px; color: #9dd187;">🔗 Datos técnicos</h3>
        <p><strong>Responder a:</strong> <a href="mailto:${email}">${email}</a></p>

        <hr style="margin-top: 32px; border: none; border-top: 1px solid #ddd;"/>

        <div style="text-align: center; margin-top: 16px;">
          <img 
            src="https://www.sharetogo.es/logos/logocoche.png"
            alt="SharetoGo"
            style="width: 140px; opacity: 0.95;"
          />
          <p style="font-size: 12px; color: #777; margin-top: 8px;">
            Email automático generado desde el formulario de contacto de SharetoGo.
          </p>
        </div>
      </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });

  } catch (error) {
    console.error("❌ Error in POST:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
