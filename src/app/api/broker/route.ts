// src/app/api/users/route.ts

import broker from "@/server/broker";
import { type NextRequest } from "next/server";

export const GET = (req: NextRequest) => {
  return broker.getBrokers();
};
