import DB from "@/lib/db";
import jwt from "jsonwebtoken";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import crypto from "crypto";
import twilio, { Twilio } from "twilio";
import { addDays, addHours } from "date-fns";
import { customError } from "./error";

class Verification extends DB {
  private APP_NAME = "Mortgage Hub";
  private IV_LENGTH = 16;
  private twilio_client: Twilio;

  constructor() {
    super();
    this.twilio_client = twilio(
      process.env.ACCOUNT_SID as string,
      process.env.AUTH_TOKEN as string
    );
  }

  public async verifyEmail(token: string) {
    const decoded = jwt.verify(
      token,
      process.env.VERIFY_EMAIL_TOKEN_SECRET as string
    ) as Record<"id", string>;

    // Find the user based on the token's user ID
    const user = await this.db
      .selectFrom("users")
      .selectAll()
      .where("id", "=", decoded.id)
      .executeTakeFirst();

    if (!user) {
      throw new Error("Invalid token");
    }

    // Update the user's role to "verified"
    await this.db
      .updateTable("users")
      .set({ is_email_verified: true })
      .where("id", "=", user.id)
      .execute();
    return user;
  }

  public async generateTotpSecret() {
    const secret = speakeasy.generateSecret({ name: this.APP_NAME });
    const qrCodeDataURL = await QRCode.toDataURL(secret.otpauth_url!);
    return { secret: secret.base32, qrCodeDataURL };
  }

  public async verifyTotpToken(token: string, secret: string) {
    return speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
      window: 1,
    });
  }

  public encrypt(text: string) {
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(process.env.ENC_KEY as string),
      iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  }

  public decrypt(text: string) {
    const textParts = text.split(":");
    const iv = Buffer.from(textParts[0], "hex");
    const encryptedText = Buffer.from(textParts[1], "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(process.env.ENC_KEY as string),
      iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  private async listService() {
    const services = await this.twilio_client.verify.v2.services.list({
      limit: 20,
    });
    return services;
  }

  private async createService() {
    return await this.twilio_client.verify.v2.services.create({
      friendlyName: "Phone OTP Verification Service",
    });
  }

  private async getOrCreateService() {
    const services = await this.listService();
    if (services.length === 0) {
      return await this.createService();
    }
    return services[0];
  }

  public async verifyPhone(code: string, phone: string) {
    console.log("phone", phone);
    const phoneNo = customError.phoneNumberSchema.parse({ phone });
    console.log("phone No", phoneNo);

    const service = await this.getOrCreateService();
    console.log("entered", service);
    const verification_check = await this.twilio_client.verify.v2
      .services(service.sid)
      .verificationChecks.create({
        to: !phone.startsWith("+") ? `+${phone}` : phone,
        code,
      });
    console.log("verification_check", verification_check);
    return verification_check;
    //   .then((verification_check) => console.log(verification_check.status));
  }

  public async sendPhoneVerificationText(phone: string) {
    console.log("phone for verification initial", phone);
    const phoneNo = customError.phoneNumberSchema.parse(phone);
    console.log("phone No after zod", phoneNo);
    const service = await this.getOrCreateService();
    console.log("entered", service);
    const verification = await this.twilio_client.verify.v2
      .services(service.sid)
      .verifications.create({
        to: !phone.startsWith("+") ? `+${phone}` : phone,
        channel: "sms",
      });
    console.log("verification", verification);
    return verification;
    //   .then((verification_check) => console.log(verification_check.status));
  }

  public generateClaimToken() {
    const token = crypto.randomBytes(32).toString("hex");
    const claim_token_hash = this.encrypt(token);
    const expiresAt = addDays(new Date(), 7);
    return { claim_token: claim_token_hash, claim_token_expires_at: expiresAt };
  }
}

export default new Verification();
