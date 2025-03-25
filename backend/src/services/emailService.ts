import { bookingEmailTemplate } from '../templates/booking_template';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();

export const sendBookingEmail = async (userEmail: string, bookingDetails: any) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Booking Confirmation',
      html: bookingEmailTemplate(bookingDetails)
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
