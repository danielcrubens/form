import { Resend } from 'resend';

const resend = new Resend('re_E6kjgRoB_GhfgKL8hGLugc6G1EL4fFhL4');

export default defineEventHandler(async (event) => {

  try {
    const body = await readBody(event);
    console.log('Incoming email:', body.email);


    const options = {
      from: 'Teste Daniel <onboarding@resend.dev>',
      to: [body.email], 
      subject: `Confirmação de Registro, ${body.name}`,
      html: `<strong>Olá ${body.name}, seu registro foi realizado com sucesso!</strong>`,
    };

    console.log('Opções do email:', options);
    await resend.emails.send(options);
    return { message: 'Email sent' };
  } catch (error) {
    console.error('Erro ao enviar email:', error);

    return {
      message: 'Failed to send email',
      error: error.message || 'An unknown error occurred',
    };
  }
});
