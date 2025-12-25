const nodemailer = require('nodemailer');

// OTP generator
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Creates Brevo SMTP transporter using LOGIN + PASSWORD mode
 * Why Brevo: More reliable than Gmail SMTP for production apps
 * Why LOGIN mode: Simpler than API-key mode, works without domain
 */
const createTransporter = () => {
  // Validate required Brevo environment variables
  if (!process.env.BREVO_SMTP_HOST || !process.env.BREVO_SMTP_PORT || 
      !process.env.BREVO_SMTP_USER || !process.env.BREVO_SMTP_PASS) {
    throw new Error('Missing Brevo SMTP configuration');
  }

  return nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: Number(process.env.BREVO_SMTP_PORT),
    secure: false, // Use STARTTLS
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASS
    }
  });
};

const sendOtpEmail = async (email, otp) => {
  console.log(`OTP request received for ${email}`);
  console.log(`Generated OTP: ${otp}`);
  
  try {
    const transporter = createTransporter();
    
    // Verify SMTP connection before sending
    console.log('Verifying Brevo SMTP connection...');
    await transporter.verify();
    console.log('Brevo SMTP verified');
    
    const mailOptions = {
      from: 'Willow <no-reply@brevo.com>', // Safe shared sender
      to: email,
      subject: 'Your Willow OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Willow Verification Code</h2>
          <p>Your OTP code is:</p>
          <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 3px; margin: 20px 0;">
            ${otp}
          </div>
          <p style="color: #666;">This code expires in 15 minutes.</p>
          <p style="color: #666; font-size: 12px;">If you didn't request this code, please ignore this email.</p>
        </div>
      `
    };
    
    const result = await transporter.sendMail(mailOptions);
    
    console.log(`Email sent: accepted=[${result.accepted.join(', ')}], rejected=[${result.rejected.join(', ')}]`);
    
    if (result.rejected.length > 0) {
      throw new Error(`Email rejected for: ${result.rejected.join(', ')}`);
    }
    
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error(`Email send failed for ${email}:`, error.message);
    throw new Error(`Email delivery failed: ${error.message}`);
  }
};

module.exports = { sendOtpEmail, generateOtp };