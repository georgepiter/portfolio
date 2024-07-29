const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    console.log("Event: ", JSON.stringify(event, null, 2));
    console.log("HTTP Method: ", event.httpMethod);
    
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    const { name, email, message } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
        service: 'Terra',
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.USER,
        subject: `New contact form submission from ${name}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Message sent successfully' }),
        };
    } catch (error) {
        console.error("Error sending email: ", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};

const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    console.log(event);
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    const { name, email, message } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
        service: 'terra',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.USER,
        subject: `New contact form submission from ${name}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Message sent successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};
