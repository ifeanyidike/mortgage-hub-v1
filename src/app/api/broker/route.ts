import broker from "@/server/broker";
import user from "@/server/user";
import { type NextRequest } from "next/server";

export const GET = (req: NextRequest) => {
  return broker.getBrokers();
};
