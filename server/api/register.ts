// server/api/register.ts
import { useCompiler } from '#vue-email'
import { Resend } from 'resend';

const resend = new Resend('re_E6kjgRoB_GhfgKL8hGLugc6G1EL4fFhL4');

export default defineEventHandler(async (event) => {
  // Obter os dados do corpo da requisição
  const body = await readBody(event)
  
  // Validar os dados recebidos
  if (!body.email || !body.name) {
    throw createError({
      statusCode: 400,
      message: 'Email e nome são obrigatórios'
    })
  }

  try {
   

    const options = {
      from: 'onboarding@resend.dev', // Seu email de envio
      to: body.email,  // Email dinâmico
      subject: 'Confirmação de Cadastro',
      html: `<strong>Olá ${body.name}, seu cadastro foi realizado com sucesso!</strong>`,
    };

    await resend.emails.send(options);
    return { message: 'Email enviado com sucesso', success: true };
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    throw createError({
      statusCode: 500,
      message: 'Erro interno ao enviar email'
    })
  }
});