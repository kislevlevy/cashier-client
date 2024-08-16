const nodemailer = require('nodemailer');

exports.sendMail = async function (options) {
  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: process.env.MT_PORT,
    auth: {
      user: process.env.MT_USER,
      pass: process.env.MT_PASS,
    },
  });

  await transport.sendMail(options);
};
