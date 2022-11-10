const nodemailer = require('nodemailer')

module.exports = async ({email, service, from, subject, html, text}) => {
    const mail = nodemailer.createTransport({
        service,
        auth: {
            user: process.env.nodemailer_email,
            pass: process.env.nodemailer_pass
        }
    })

    await mail.sendMail({
        from,
        to: email,
        subject,
        text,
        html
    })
}