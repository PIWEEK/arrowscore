const {readFileSync} = require('fs');


sendEmail({ strapi, emailTemplate, to, context }) {
  const html_template = readFileSync('src/emails/${emailTemplate}.html', 'utf-8');
  const txt_template = readFileSync('src/emails/${emailTemplate}.txt', 'utf-8');
  const subject_template = readFileSync('src/emails/${emailTemplate}-subject.txt', 'utf-8');

  const emailTemplate = {
    subject: subject_template,
    text: txt_template,
    html: html_template
  }

  strapi.plugins['email'].services.email.sendTemplatedEmail(
    { to: to, },
    emailTemplate,
    context
  );
};


module.exports = {
  sendEmail
}
