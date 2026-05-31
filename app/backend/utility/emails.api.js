import {
  NOTIFY_ADMIN_CONTACT,
  NOTIFY_CLIENT_CONTACT,
  NOTIFY_FILL_TESTIMONIAL,
  VERIFICATION_EMAIL_TESTIMONIAL_TEMPLATE,
} from "../template/email.templates.js";
import { sender, transporter } from '../config/Nodemailer.js';
import { config } from "dotenv";
config();

export const sendVerificationEmailForTestimonial = async (email, verificationCode) => {
  const mailOptions = {
    from: sender.from,  // Use sender's "from" address
    to: email,          // Recipient's email address
    subject: "Verify Your Email!",
    html: VERIFICATION_EMAIL_TESTIMONIAL_TEMPLATE.replace("{verificationCode}", verificationCode),
    category: "Email Verification"
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error while sending verification email", error);
  }
}

export const NotifyFillTestimonial = async (email) => {
  const mailOptions = {
    from: sender.from,    // Use sender's "from" address
    to: email,            // Recipient's email address
    subject: "A Request from Our Chief: Please Fill Out the Testimonial Form!",
    html: NOTIFY_FILL_TESTIMONIAL
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error while sending request to fill Testimonial Form email", error);
  }
}

export const NotifyContact = async (contactData) => {
  try {
    // Define email templates
    let adminHtml = NOTIFY_ADMIN_CONTACT;
    let clientHtml = NOTIFY_CLIENT_CONTACT;

    // Replace placeholders with actual values
    for (let key in contactData) {
      const regex = new RegExp(`{${key}}`, 'g');
      adminHtml = adminHtml.replace(regex, contactData[key]);
      clientHtml = clientHtml.replace(regex, contactData[key]);
    }

    // Define admin email options
    const adminMailOptions = {
      from: sender.from,
      to: process.env.DEV_EMAIL,
      subject: "Chief A New Contact Form Submission!",
      html: adminHtml
    };

    // Define client email options
    const clientMailOptions = {
      from: sender.from,
      to: contactData?.email,
      subject: "Thank You for Reaching Out!",
      html: clientHtml
    };

    // Send emails concurrently
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);

  } catch (error) {
    console.log("Error while sending contact emails", error);
  }
};
