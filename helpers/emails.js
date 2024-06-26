import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  //   console.log(datos);
  const { email, nombre, token } = datos;

  // Enviar el email
  await transport.sendMail({
    from: "BienesRaices.com",
    to: email,
    subject: "Confirma tu Cuenta en BienesRaices.com",
    text: "Confirma tu Cuenta en BienesRaices.com",
    html: `
    <p>Hola ${nombre}, comprueba tu cuenta en bienesRaices.com  </p>
    <p>Tu cuenta ya esta lista, solo debes de confirmar en el siguiente enlace:</p>
    <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirmar Cuenta</a>

    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `,
  });
};

const emailOlvidePassword = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  //   console.log(datos);
  const { email, nombre, token } = datos;

  // Enviar el email
  await transport.sendMail({
    from: "BienesRaices.com",
    to: email,
    subject: "Reestablece tu password en BienesRaices.com",
    text: "Reestablece tu password en BienesRaices.com",
    html: `
    <p>Sigue el siguiente enlace para generar un password nuevo: </p>
    <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 3000
    }/auth/olvide-password/${token}">Reestablecer password</a>

    <p>Si tu no solictaste el cambio de password, puedes ignorar el mensaje</p>
    `,
  });
};

export { emailRegistro, emailOlvidePassword };
