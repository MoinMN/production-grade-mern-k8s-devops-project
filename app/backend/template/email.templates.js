export const VERIFICATION_EMAIL_TESTIMONIAL_TEMPLATE = `
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #121212;
      font-family: 'Arial', sans-serif;
      color: #e0e0e0;
      text-align: center;
    }

    .container {
      max-width: 500px;
      margin: 40px auto;
      padding: 25px;
      background: #1e1e1e;
      border-radius: 10px;
      text-align: center;
      box-shadow: 0 4px 10px rgba(0, 255, 255, 0.2);
    }

    h1 {
      color: #ffffff;
      font-size: 24px;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      color: #b0b0b0;
    }

    .otp-container {
      display: inline-block;
      background: linear-gradient(45deg, #1E88E5, #008c9e);
      color: #fff;
      font-size: 28px;
      font-weight: bold;
      padding: 12px 20px;
      border-radius: 8px;
      letter-spacing: 3px;
      margin: 15px 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      animation: fadeIn 0.8s ease-in-out;
    }

    .regard {
      font-size: 14px;
      color: #f4f4f4;
    }

    .footer {
      margin-top: 20px;
      font-size: 14px;
      color: #757575;
    }

    .footer a {
      color: #00bcd4;
      text-decoration: none;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
</head>

<body>

  <div class="container">
    <h1>🔐 Verify Your Email</h1>
    <p>Welcome! Use the OTP below to verify your email:</p>

    <div class="otp-container">{verificationCode}</div>

    <p>
      Thank you for verification.
    </p>

    <div class="regard">
      <span>Regards,</span>
      <span>Moin MN</span>
    </div>


    <p class="footer">
      If you didn't request this, please ignore this email.<br>
      Need help? <a href=${process.env.FRONTEND_URL}>Contact chief</a>
    </p>
  </div>

</body>

</html>
`;

export const NOTIFY_FILL_TESTIMONIAL = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Share Your Feedback</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #121212;
      color: #ffffff;
      margin: 0;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #1e1e1e;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
      text-align: center;
    }

    .header {
      background: linear-gradient(135deg, #1E88E5, #aed5ff);
      padding: 20px;
      border-radius: 10px 10px 0 0;
    }

    .header h1 {
      color: #fff;
      margin: 0;
      font-size: 24px;
    }

    .content {
      padding: 20px;
    }

    .btn {
      display: inline-block;
      background: #1E88E5;
      color: #ffffff;
      padding: 12px 24px;
      text-decoration: none;
      font-weight: bold;
      border-radius: 5px;
      transition: background 0.3s;
    }

    .btn:hover {
      background: #006fd1;
    }

    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #aaaaaa;
    }
  </style>
</head>

<body>

  <div class="container">
    <div class="header">
      <h1>We’d Love Your Feedback!</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Thank you for choosing to work with us! Your trust and support mean the world to us. 🚀</p>
      <p>We’re always striving to improve, and your feedback is invaluable in helping us grow.</p>
      <p>Could you take a moment to share your experience with us?</p>
      <a href="${process.env.FRONTEND_URL + '/post-testimonial'}" class="btn">Submit Testimonial</a>
      <p>We truly appreciate your time and insights. Looking forward to working together again in the future!</p>
      <p>Best regards,</p>
      <p>- Moin MN</p>
    </div>
    <div class="footer">
      <p>This is an automated message.</p>
    </div>
  </div>

</body>

</html>
`;

export const NOTIFY_ADMIN_CONTACT = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #121212;
      color: #ffffff;
      margin: 0;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #1e1e1e;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    }

    .header {
      background: linear-gradient(135deg, #1E88E5, #aed5ff);
      padding: 20px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }

    .header h1 {
      color: #fff;
      margin: 0;
      font-size: 24px;
    }

    .content {
      padding: 20px;
    }

    .info {
      background: #252525;
      padding: 15px;
      border-radius: 5px;
      margin-top: 10px;
    }

    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #aaaaaa;
      text-align: center;
    }

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #1E88E5;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      text-decoration: none;
      text-align: center;
      margin: 20px auto;
    }

    .btn:hover {
      background-color: #1565c0;
    }
  </style>
</head>

<body>

  <div class="container">
    <div class="header">
      <h1>Chief A New Contact Form Submission</h1>
    </div>
    <div class="content">
      <p>Hello Chief,</p>
      <p>You have received a new contact form submission from your portfolio website.</p>
      <div class="info">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {number}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Message:</strong></p>
        <p>{message}</p>
      </div>
      <p>Please review and respond accordingly.</p>
      <p>Best truly,</p>
      <p>💖</p>
      <a href="${process.env.FRONTEND_URL}/admin/contact" class="btn">Take Me to Admin Panel</a>
    </div>
    <div class="footer">
      <p>This is an automated message.</p>
    </div>
  </div>

</body>

</html>
`;

export const NOTIFY_CLIENT_CONTACT = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Reaching Out!</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #121212;
      color: #ffffff;
      margin: 0;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #1e1e1e;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    }

    .header {
      background: linear-gradient(135deg, #1E88E5, #aed5ff);
      padding: 20px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }

    .header h1 {
      color: #fff;
      margin: 0;
      font-size: 24px;
    }

    .content {
      padding: 20px;
      text-align: center;
    }

    .message-box {
      background: #252525;
      padding: 15px;
      border-radius: 5px;
      margin-top: 10px;
    }

    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #aaaaaa;
      text-align: center;
    }

    .btn {
      display: inline-block;
      background-color: #1E88E5;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      text-decoration: none;
      margin-top: 20px;
      text-align: center;
    }

    .btn:hover {
      background-color: #1565c0;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Reaching Out!</h1>
    </div>
    <div class="content">
      <p>Dear {name},</p>
      <p>We truly appreciate you getting in touch! Our Chief is a highly responsive person, and rest assured, he will
        personally go through your message and reach out to you at the earliest opportunity.</p>
      <div class="message-box">
        <p><strong>Your Message:</strong></p>
        <p>{message}</p>
      </div>
      <p>Meanwhile, feel free to explore more about us. We look forward to connecting with you!</p>
      <a href=${process.env.FRONTEND_URL} class="btn">Visit Our Website</a>
    </div>
    <div class="footer">
      <p>This is an automated message. You will hear from us soon! 📩</p>
    </div>
  </div>
</body>

</html>
`;