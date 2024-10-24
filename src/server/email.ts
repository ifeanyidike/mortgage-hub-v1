import nodemailer from "nodemailer";
import { promises as fs } from "fs";

import path from "path";

class Email {
  // Send verification email

  public async sendVerificationEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
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
      "process.env.ETHEREAL_USER_NAME",
      process.env.ETHEREAL_PASSWORD
    );

    const verificationUrl = `http://localhost:3000/verify/email?token=${token}`;
    const pathname = path.resolve(
      process.cwd(),
      "email-templates",
      "email-verfication.html"
    );

    let template = await fs.readFile(pathname, "utf-8");
    template = template.replace("{{verificationUrl}}", verificationUrl);

    const result = await transporter.sendMail({
      from: '"Your App" <no-reply@yourapp.com>',
      to: email,
      subject: "Email Verification",
      html: template,
    });

    console.log(`Preview URL: `, result);
  }
}

export const emailService = new Email();
