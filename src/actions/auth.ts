"use server";

import { signIn, signOut } from "@/auth";
import { cookies } from "next/headers";

export async function handleSocialLogin(formData: FormData) {
  const action = formData.get("action") as string;
  cookies().set("role", formData.get("role") as string);
  await signIn(action, { redirectTo: "/", state: "broker" });
}

export async function handleLogout() {
  console.log("I am called");
  await signOut({ redirectTo: "/" });
}

export async function handleCredentialLogin(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("result in login credentials", result);
    return result;
  } catch (error: any) {
    throw new Error("Invalid email or password");
  }
}
