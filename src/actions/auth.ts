"use server";

import { signIn, signOut } from "@/auth";
import user from "@/server/user";
import { cookies } from "next/headers";

export async function handleSocialLogin(formData: FormData) {
  const action = formData.get("action") as string;
  const role = formData.get("role") as string;
  console.log("called");
  if (role) {
    cookies().set("role", formData.get("role") as string);
  }

  await signIn(action, { redirectTo: "/" });
}

export async function handleLogout() {
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
    console.log("error in login credentials", error);
    throw new Error("Invalid email or password");
  }
}

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = (formData.get("role") as "user" | "broker") || "user";
  const dob = formData.get("dob") as string;
  const name = formData.get("name") as string;

  return await user.createOne(email, password, role, dob, name);
}
