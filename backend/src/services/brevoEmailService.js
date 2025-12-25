const axios = require('axios');

// OTP generator
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Uses Brevo Transactional API instead of SMTP
 * Why API: More reliable than SMTP, better delivery rates
 * Why not SMTP: Can have connection issues, slower
 */
const sendOtpEmail = async (email, otp) => {
  console.log(`OTP request received for ${email}`);
  console.log(`Generated OTP: ${otp}`);
  
  if (!process.env.BREVO_API_KEY) {
    throw new Error('Missing BREVO_API_KEY configuration');
  }
  
  try {
    const payload = {
      sender: {
        name: "Willow",
        email: "creatusest1@gmail.com"
      },
      to: [{
        email: email
      }],
      subject: "Your Willow OTP Code",
      htmlContent: `
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
    
    console.log('Sending email via Brevo API...');
    
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      payload,
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log(`Email sent successfully: messageId=${response.data.messageId}`);
    
    return { success: true, messageId: response.data.messageId };
    
  } catch (error) {
    console.error(`Email send failed for ${email}:`, error.response?.data || error.message);
    throw new Error(`Email delivery failed: ${error.response?.data?.message || error.message}`);
  }
};

module.exports = { sendOtpEmail, generateOtp };