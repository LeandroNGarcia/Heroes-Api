import nodemailer from "nodemailer";
const email = process.env.HOST_EMAIL;
const password = process.env.HOST_PASSWORD;

export async function sendVerificationEmail(user) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: email,
    to: user.email,
    subject: "Verifica tu correo electrónico",
    text: `¡Hola ${user.name}! Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico: http://localhost:3001/verify/${user.email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.trace("Error al enviar el correo electrónico:", error);
    } else {
      console.log("Correo electrónico de verificación enviado:", info.response);
    }
  });
}

export function newsletterEmail(user, product) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: email,
    to: user.email,
    subject: `Promocion Especial para ${user.name}`,
    html: `
    <div>
    <h1>${product.name}</h1>
    <p>Llevatelo a solo $${product.price} solo por hoy!!</p>
    </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar email newsletter");
    } else {
      console.log("Newsletter enviado correctamente", info.response);
    }
  });
}
