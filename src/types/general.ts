import { Broker, ExistingUser } from "./db";

export type Role = "user" | "admin" | "broker" | "lender";
export type BrokerUserData = Partial<ExistingUser & Broker>;
