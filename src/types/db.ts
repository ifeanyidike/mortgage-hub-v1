import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  users: UserTable;
  brokers: BrokerTable;
  lenders: LenderTable;
  loans: LoanTable;
  notifications: NotificationTable;
}

// This interface describes the `person` table to Kysely. Table
// interfaces should only be used in the `Database` type above
// and never as a result type of a query!. See the `Person`,
// `NewPerson` and `PersonUpdate` types below.
export interface UserTable {
  // Columns that are generated by the database should be marked
  // using the `Generated` type. This way they are automatically
  // made optional in inserts and updates.
  id: Generated<string>;
  auth0_sid: string;
  name: string;
  email: string;
  role: "user" | "broker" | "lender";
  profile_photo: string | null;

  // You can specify a different type for each operation (select, insert and
  // update) using the `ColumnType<SelectType, InsertType, UpdateType>`
  // wrapper. Here we define a column `created_at` that is selected as
  // a `Date`, can optionally be provided as a `string` in inserts and
  // can never be updated:
  created_at: Generated<Date>;
  updated_at: Date | null;

  // You can specify JSON columns using the `JSONColumnType` wrapper.
  // It is a shorthand for `ColumnType<T, string, string>`, where T
  // is the type of the JSON object/array retrieved from the database,
  // and the insert and update types are always `string` since you're
  // always stringifying insert/update values.
  //   metadata: JSONColumnType<{
  //     login_at: string;
  //     ip: string | null;
  //     agent: string | null;
  //     plan: "free" | "premium";
  //   }>;
}

// You should not use the table schema interfaces directly. Instead, you should
// use the `Selectable`, `Insertable` and `Updateable` wrappers. These wrappers
// make sure that the correct types are used in each operation.
//
// Most of the time you should trust the type inference and not use explicit
// types at all. These types can be useful when typing function arguments.
export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export interface BrokerTable {
  id: Generated<string>;
  user_id: string;
  license_number: string;
  experience_years: number;
  status: "active" | "suspsended";
  commission_rate: number;
  joined_at: Date;
}

export type Broker = Selectable<BrokerTable>;
export type NewBroker = Insertable<BrokerTable>;
export type BrokerUpdate = Updateable<BrokerTable>;

export interface LenderTable {
  id: Generated<string>;
  user_id: string;
  financial_document: string | null;
  total_investment: number;
  available_funds: number;
  joined_at: Date;
}

export type Lender = Selectable<LenderTable>;
export type NewLender = Insertable<LenderTable>;
export type LenderUpdate = Updateable<LenderTable>;

export interface LoanTable {
  id: Generated<string>;
  user_id: string;
  broker_id: string;
  lender_id: string;
  amount: number;
  interest_rate: number;
  duration_months: number;
  status: "pending" | "approved" | "rejected" | "active";
  created_at: Generated<ColumnType<Date, string, never>>;
  updated_at: ColumnType<Date, string>;
}

export type Loan = Selectable<LoanTable>;
export type NewLoan = Insertable<LoanTable>;
export type LoanUpdate = Updateable<LoanTable>;

export interface NotificationTable {
  id: Generated<string>;
  user_id: string;
  message: string;
  is_read: boolean;
  created_at: Generated<ColumnType<Date, string, never>>;
}

export type Notification = Selectable<NotificationTable>;
export type NewNotification = Insertable<NotificationTable>;
export type NotificationUpdate = Updateable<NotificationTable>;