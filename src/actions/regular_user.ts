"use server";

import { regularUserProfile } from "@/server/user_profile";
import { UserProfileUpdate } from "@/types/db";

export async function updateUserProfile(id: string, data: UserProfileUpdate) {
  try {
    await regularUserProfile.upsert(id, data);
    return true;
  } catch (error) {
    console.log("error updating user profile", error);
  }
}

export async function getOne(user_id: string) {
  try {
    const userProfile = await regularUserProfile.getOne(user_id);
    return userProfile;
  } catch (error) {
    console.log("error getting user profile", error);
  }
}
