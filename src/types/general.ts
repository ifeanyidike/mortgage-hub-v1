import { Session } from "next-auth";
import {
  Broker,
  Documents,
  ExistingUser,
  Leads,
  Purchases,
  UserProfile,
} from "./db";

export type Role = "user" | "admin" | "broker" | "lender";
export type BrokerUserData = Partial<ExistingUser & Broker>;
export type UserData = Partial<
  {
    name: string | null;
    picture: string | null;
    email: string | null;
    phone: string | null;
    user_created_at: Date | null;
    user_updated_at: Date | null;
    dob: string | null;
    is_email_verified: boolean | null;
    is_phone_verified: boolean | null;
  } & UserProfile
>;

export type BrokerData = Partial<
  {
    name: string | null;
    picture: string | null;
    email: string | null;
    phone: string | null;
    user_created_at: Date | null;
    user_updated_at: Date | null;
    dob: string | null;
    is_email_verified: boolean | null;
    is_phone_verified: boolean | null;
  } & Broker
>;

export type EditableUserData = Omit<
  UserData,
  | "user_created_at"
  | "user_updated_at"
  | "is_email_verified"
  | "is_phone_verified"
  | "id"
  | "user_id"
  | "updated_at"
  | "created_at"
  | "picture"
  | "tools_selection"
>;

export type CustomSessionUser = Session["user"] & {
  role: "broker" | "user";
  picture: string;
  user_profile: UserProfile;
};

export type PurchaseData = Partial<
  ExistingUser &
    UserProfile &
    Purchases &
    Leads & {
      purchase_id: string;
      documents: Documents[];
      // document_name: string;
      // document_size: string;
      // document_description: string;
      // document_id: string;
      // document_type: string;
      // document_url: string;
      // document_uploaded_at: Date;
    }
>;
