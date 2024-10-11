import nodemailer from "nodemailer";

class Email {
  // Send verification email

  public async sendVerificationEmail(email: string, token: string) {
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.ETHEREAL_USER_NAME,
        pass: process.env.ETHEREAL_PASSWORD,
      },
    });

    console.log(
      process.env.ETHEREAL_USER_NAME,
      "rocess.env.ETHEREAL_USER_NAME",
      process.env.ETHEREAL_PASSWOR
    );

    const verificationUrl = `http://localhost:3000/verify/email?token=${token}`;

    const result = await transporter.sendMail({
      from: '"Your App" <no-reply@yourapp.com>',
      to: email,
      subject: "Email Verification",
      html: `<p>Please verify your email by clicking the link below:</p>
             <a href="${verificationUrl}">Verify Email</a>`,
    });

    console.log(`Preview URL: `, result);
  }
}

export const emailService = new Email();
