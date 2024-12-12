"use server";

import { lead } from "@/server/lead";

export async function fetchLeadUserList(username: string) {
  console.log("username");
  return await lead.fetchUserList(username);
}

export async function fetchAvailableLeads(params: string) {
  return await lead.fetchLeads(JSON.parse(params));
}
