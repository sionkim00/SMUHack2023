
import nodemailer from 'nodemailer'


const sendMail = async (subject, toEmail, text) =>  
{
    const transporter = nodemailer.createTransport({
        
        service: "Gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASS,
        },
    });

    const mailData  = {
        from: process.env.NODEMAILER_EMAIL,
        to: toEmail, 
        subject: subject,
        text: text,
    };

    try {
        await transporter.sendMail(mailOptions);
        alert('Email sent successfully')
    } catch (error) {
        console.error('error sending email', error);
        alert('failed to send email');
    }

 
}

export default sendMail;