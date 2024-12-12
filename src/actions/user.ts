"use server";
import user from "@/server/user";
import { UserUpdate } from "@/types/db";

export async function updateUserData(id: string, data: UserUpdate) {
  try {
    await user.updateOne(data, id);
  } catch (error) {}
}
