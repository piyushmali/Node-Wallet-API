import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendTestEmail = async () => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'leone.kemmer12@ethereal.email',
    subject: 'Test Email from Node.js',
    text: 'This is a test email sent from Node.js using nodemailer.',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

sendTestEmail();
