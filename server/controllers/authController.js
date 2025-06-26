import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import fetch from 'node-fetch'

const login = async (req, res) => {
    try {
        const {email, password, captchaToken} = req.body

        if (!captchaToken) {
          return res.status(400).json({ success: false, error: "Captcha verification required" });
        }

        const verifyCaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`;

        const captchaRes = await fetch(verifyCaptchaUrl, { method: "POST" });
        const captchaData = await captchaRes.json();

        if (!captchaData.success) {
          return res.status(400).json({ success: false, error: "Captcha failed" });
        }
        const user = await User.findOne({email})
        if(!user) {
            res.status(404).json({success: false, error: "User not found"})
            return
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            res.status(404).json({success: false, error: "Wrong password"})
            return
        }

        const token = jwt.sign({
            _id: user._id, 
            role: user.role},
            process.env.JWT_KEY, {expiresIn: "10d"}
        )

        res.status(200).json({success: true, 
            token, 
            user: {_id: user.id, name: user.name, role: user.role},})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

const verify = (req, res) => {
    return res.status(200).json({success: true, user: req.user})
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body

        console.log("Email received:", email);
        console.log("SMTP_USER:", process.env.SMTP_USER);
        console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Exists" : "Missing");

        if (!email) {
            return res.status(400).json({ success: false, error: 'Email is required' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' })
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex')
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = Date.now() + 10 * 60 * 1000;
        const resetTokenExpiry = Date.now() + 3600000 // 1 hour expiry

        // Save token and expiry to user document
        user.resetPasswordToken = resetToken
        user.resetPasswordExpires = resetTokenExpiry
        user.resetOtp = otp;
        user.otpExpires = otpExpiry;
        await user.save()

        // Create reset URL
        const resetUrl = `${process.env.CLIENT_URL}/verify-otp/${resetToken}`;



        // Setup nodemailer transporter (configure your SMTP settings)
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST ,
            port: process.env.SMTP_PORT ,
            secure: true,
            auth: {
                user: process.env.SMTP_USER ,
                pass: process.env.SMTP_PASS ,
            }
        })

        // Email message options
        let message = {
        from: process.env.SMTP_FROM,
        to: user.email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Your OTP is ${otp}. Please click the following link to verify your OTP and continue resetting your password: ${resetUrl}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <p>Hello ${user.name},</p>
            <p>You requested a password reset.</p>
            <p><strong>Your OTP:</strong> <span style="font-size: 18px;">${otp}</span></p>
            <p><strong>OTP is valid for 10 minutes.</strong></p>
            <p>Click the link below to verify your OTP:</p>
            <a href="${resetUrl}" style="color: teal; font-weight: bold;">Verify OTP</a>
            <p>If you did not request this, please ignore this email.</p>
            <br/>
            <p>Regards,<br/>Asset Management System</p>
          </div>
        `
      }


        // Send email
        await transporter.sendMail(message)

        res.status(200).json({ success: true, message: 'Password reset instructions and OTP sent to your email' })
    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ success: false, error: error.message })
    }
}

const verifyOtp = async (req, res) => {
  try {
    const { token, resetOtp } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetOtp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid or expired OTP or token" });
    }

    res.status(200).json({ success: true, message: "OTP verified. Proceed to reset password." });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


const resetPassword = async (req, res) => {
  try {
    const { token, resetOtp, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetOtp,
      otpExpires: { $gt: Date.now() },
      resetPasswordExpires: { $gt: Date.now() }, // Token not expired
    });

    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid or expired token" });
    }

    // Hash and set new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.resetOtp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {login, verify, forgotPassword, verifyOtp, resetPassword}
