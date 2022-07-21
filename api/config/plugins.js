module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('EMAIL_HOST'),
        port: env('EMAIL_PORT'),
        secure: true,
        auth: {
          user: env('EMAIL_AUTH_USER'),
          pass: env('EMAIL_AUTH_PASS'),
        },
      },
      settings: {
        defaultFrom: env('EMAIL_AUTH_USER'),
        defaultReplyTo: env('EMAIL_AUTH_USER'),
      },
    },
  },
});
