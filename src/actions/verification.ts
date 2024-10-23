"use server";

import verifyService from "@/server/Verification";
import { handleCredentialLogin } from "./auth";

export const verifyEmail = async (token: string) => {
  return await verifyService.verifyEmail(token);
};

export const sendVerifiationText = async () => {
  const data = await verifyService.sendPhoneVerificationText();
  console.log("data", data);
};

export const verifyPhone = async (code: number) => {
  console.log("code", code);
  const data = await verifyService.verifyPhone(code.toString());
  console.log("data", data);
};
