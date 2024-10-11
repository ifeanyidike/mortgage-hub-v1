"use server";
import verifyService from "@/server/Verification";

export async function generateTotpSecret() {
  return await verifyService.generateTotpSecret();
}

export async function verifyTotpToken(token: string, secret: string) {
  return await verifyService.verifyTotpToken(token, secret);
}
