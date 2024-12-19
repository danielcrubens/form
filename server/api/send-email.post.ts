// server/api/send-email.post.ts
import { useCompiler } from '#vue-email'
import { Resend } from 'resend';

const resend = new Resend('re_E6kjgRoB_GhfgKL8hGLugc6G1EL4fFhL4');

export default defineEventHandler(async (event) => {
  const template = await useCompiler('welcome.vue', {
    props: {
      name: 'John Doe',
      email: 'delivered@resend.dev',
    }
  })

  const options = {
    from: 'onboarding@resend.dev',
    to: 'delivered@resend.dev',
    subject: 'hello world',
    html: template,
  };

  await resend.emails.send(options);
  return { message: 'Email sent' };
});
