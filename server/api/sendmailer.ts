import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || 'mlsn.32efa1717484da267440605867a3cbd7cf1ad29bd9e3a31d74fb466bb519c2e2',
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const sentFrom = new Sender("trial-7dnvo4dx329g5r86.mlsender.net", "Teste Daniel");
    const recipients = [
      new Recipient(body.email, body.name)
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(`Confirmação de Registro, ${body.name}`)
      .setHtml(`<strong>Olá ${body.name}, seu registro foi realizado com sucesso!</strong>`);

    console.log('Parâmetros do email:', emailParams);

    await mailerSend.email.send(emailParams);

    return { message: 'Email sent' };
  } catch (error) {
    console.error('Erro ao enviar email:', error);

    return {
      message: 'Failed to send email',
      error: error.message || 'An unknown error occurred',
    };
  }
});
