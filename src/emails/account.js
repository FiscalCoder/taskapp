const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) =>
{
    sgMail.send(
        {
            to:email,
            from: 'accidentlyhilarious@gmail.com',
            subject: 'Thnaks for joining in',
            text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
        }
    )
}

const sendCancelEmail = (email, name) =>
{
    sgMail.send(
        {
            to:email,
            from: 'accidentlyhilarious@gmail.com',
            subject: 'Goodbye Mothafucka',
            text: `Bye bye, ${name}.`,
        }
    )
}

module.exports = 
{
    sendWelcomeEmail, //es6 shorthand for name:name
    sendCancelEmail
}

