"use server";

import verifyService from "@/server/Verification";
import user from "@/server/user";
import { auth } from "@/auth";

export const verifyEmail = async (token: string) => {
  return await verifyService.verifyEmail(token);
};

export const sendVerifiationText = async (phone: string) => {
  const data = await verifyService.sendPhoneVerificationText(phone);
  return { status: "success" };
};

export const verifyPhone = async (
  user_id: string,
  code: string,
  phone: string
) => {
  console.log("code for verification");

  console.log("code for verification", code, user_id);
  try {
    const data = await verifyService.verifyPhone(code, phone);
    console.log("verification results", data);
    await user.updateOne(
      {
        is_phone_verified: true,
        phone,
      },
      user_id
    );

    return { status: "success" };
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
  // console.log("data", data);
};

export const resendVerificationEmail = async (email: string) => {
  return await user.sendVerificationEmail(email);
};
