"use server";

import verifyService from "@/server/Verification";
import { handleCredentialLogin } from "./auth";

export const verifyEmail = async (token: string) => {
  return await verifyService.verifyEmail(token);
};
