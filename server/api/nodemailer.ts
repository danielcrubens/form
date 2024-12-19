export default defineEventHandler(async (event) => {
  try {
    const { sendMail } = useNodeMailer();
    const body = await readBody(event);
    
    console.log('Incoming email:', body.email);
    
    const mailOptions = {
      to: body.email,
      subject: `Confirmação de Registro, ${body.name}`,
      html: `<strong>Olá ${body.name}, seu registro foi realizado com sucesso!</strong>`
    };
    
    console.log('Opções do email:', mailOptions);
    
    await sendMail(mailOptions);
    
    return { message: 'Email sent' };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    
    return {
      message: 'Failed to send email',
      error: error.message || 'An unknown error occurred'
    };
  }
});