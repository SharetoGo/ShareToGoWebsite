import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  // Email to admin
  const adminMailOptions = {
    from: `"SharetoGo" <${process.env.EMAIL}>`,
    to: 'contactosharetogo@gmail.com',
    subject: 'New User Registered from Popup!',
    text: `${email} registered themselves in the pop up.`,
    html: `<p><b>${email}</b> registered themselves in the pop up.</p>`,
  };

  // Email to user
  const userMailOptions = {
    from: `"SharetoGo" <${process.env.EMAIL}>`,
    to: email,
    subject: '¡Bienvenido a SharetoGo!',
    text: `¡Bienvenido a SharetoGo! 
Estamos muy contentos de tenerte en nuestra comunidad. 
Para cualquier duda o pregunta, no dudes en contactarnos.

--
SharetoGo
La aplicación de carpooling corporativo
Página Web | Contacto
https://www.instagram.com/sharetogo_/      https://www.linkedin.com/company/share-to-go/`,
    html: `<p><b>¡Bienvenido a SharetoGo!</b></p>
           <p>Estamos muy contentos de tenerte en nuestra comunidad.</p>
           <p>Para cualquier duda o pregunta, no dudes en contactarnos.</p>
           <br>
           <table cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:435px;border-collapse:collapse;border:none">
             <colgroup>
               <col width="170">
               <col width="265">
             </colgroup>
             <tbody>
               <tr style="height:139px">
                 <td style="border-width:1px;border-style:solid;border-color:rgb(255,255,255) rgb(183,183,183) rgb(255,255,255) rgb(255,255,255);overflow:hidden;padding:2px 3px;vertical-align:bottom">
                   <img src="https://lh3.googleusercontent.com/d/14GZs9QbjzntwXmTLHcZjsiLbC6DYBM1L" alt="SharetoGo Logo">
                 </td>
                 <td style="border-width:1px;border-style:solid;border-color:rgb(255,255,255) rgb(255,255,255) rgb(255,255,255) rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:bottom;text-align:center">
                   <font size="4" style="font-weight:bold">SharetoGo<br></font>
                   La aplicación de carpooling corporativo<br>
                   <a href="https://www.sharetogo.org/" target="_blank">Página Web</a>&nbsp;|&nbsp;<a href="https://www.sharetogo.org/contact" target="_blank">Contacto</a><br>
                   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                   <a href="https://www.instagram.com/sharetogo_/" target="_blank">
                     <img src="https://a.storyblok.com/f/228452/32x32/40e6b1cc14/instagram-icon_square_32x32.png" alt="Instagram">
                   </a>&nbsp; &nbsp; &nbsp;&nbsp;
                   <a href="https://www.linkedin.com/company/share-to-go/" target="_blank">
                     <img src="https://a.storyblok.com/f/228452/32x32/5b5336f05d/linkedin-icon_square_32x32.png" alt="LinkedIn">
                   </a>&nbsp; &nbsp; &nbsp;&nbsp;<br>
                 </td>
               </tr>
             </tbody>
           </table>`,
  };

  try {
    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);
    return res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    return res.status(500).json({ error: 'Error sending emails' });
  }
}
