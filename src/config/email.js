import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export const enviarEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Soporte SonriSys" <no-reply@sonrisys.com>`,
      to,
      subject,
      html,
    });
    console.log(`📩 Correo enviado a: ${to}`);
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
  }
};
