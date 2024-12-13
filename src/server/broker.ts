// import db from "@/lib/db";

import DB from "@/lib/db";
import { Database } from "@/types/db";
import { Expression, OperationNode, RawBuilder, TableExpression } from "kysely";
import { ExpressionBuilder, StringReference, sql } from "kysely";

class Broker extends DB {
  private tableName: TableExpression<Database, never> = "brokers";
  constructor() {
    super();
  }

  public async createOne(user_id: string) {
    const broker_profile = await this.db
      .insertInto("brokers")
      .values({ user_id })
      .executeTakeFirst();
    return broker_profile.insertId;
  }

  private traverseJSON<DB, TB extends keyof DB>(
    eb: ExpressionBuilder<DB, TB>,
    column: StringReference<DB, TB>,
    path: string | [string, ...string[]]
  ) {
    if (!Array.isArray(path)) {
      path = [path];
    }

    return sql`${sql.ref(column)}->${sql.raw(
      path.map((item) => `'${item}'`).join("->")
    )}`;
  }

  private json<T>(value: T): RawBuilder<T> {
    return sql`CAST(${JSON.stringify(value)} AS JSONB)`;
  }

  public async getTopBrokers() {
    return await this.db
      .selectFrom(this.tableName)
      .innerJoin("users", "brokers.user_id" as `${string}.id`, "users.id")
      .selectAll("brokers")
      .select([
        "users.email",
        "users.name",
        "users.phone as phone",
        "users.picture as picture",
        "users.created_at as user_created_at",
        "users.updated_at as user_updated_at",
      ] as any)
      .limit(10)
      .execute();
  }

  public async getAllBrokers() {
    return await this.db
      .selectFrom(this.tableName)
      .innerJoin("users", "brokers.user_id" as `${string}.id`, "users.id")
      .selectAll("brokers")
      .select([
        "users.email",
        "users.name",
        "users.phone as phone",
        "users.picture as picture",
        "users.created_at as user_created_at",
        "users.updated_at as user_updated_at",
      ] as any)
      .execute();
  }

  // public async getBrokersByFields(
  //   city: string,
  //   province: string,
  //   title: string
  // ) {
  //   return await this.db
  //     .selectFrom(this.tableName)
  //     .innerJoin("users", "brokers.user_id" as `${string}.id`, "users.id")
  //     .selectAll("brokers")
  //     .select([
  //       "users.email",
  //       "users.name",
  //       "users.phone as phone",
  //       "users.picture as picture",
  //       "users.created_at as user_created_at",
  //       "users.updated_at as user_updated_at",
  //     ] as any)
  //     // .where((eb) =>
  //     //   eb.and([
  //     //     eb(this.traverseJSON(eb, "location", "city"), "is", city),
  //     //     eb(this.traverseJSON(eb, "location", "province"), "is", province),
  //     //     eb("title", "=", title),
  //     //   ])
  //     // )
  //     // .where(sql`location`, "@>", this.json({ city, province }))
  //     .where(sql`location->>'city' ILIKE ${"%" + city + "%"}` as any)
  //     .where(sql`location->>'province' ILIKE ${"%" + province + "%"}` as any)
  //     .where(sql`title ILIKE ${"%" + title + "%"}` as any)
  //     .execute();
  // }

  public async getBrokersByFields(
    city: string,
    province: string,
    title: string
  ) {
    // Build the base query
    let query = this.db
      .selectFrom(this.tableName)
      .innerJoin("users", "brokers.user_id" as `${string}.id`, "users.id")
      .selectAll("brokers")
      .select([
        "users.email",
        "users.name",
        "users.phone as phone",
        "users.picture as picture",
        "users.created_at as user_created_at",
        "users.updated_at as user_updated_at",
        "users.is_email_verified",
        "users.is_phone_verified",
        "users.dob",
      ] as any);

    // Conditionally add filters
    if (city) {
      query = query.where(
        sql`location->>'city' ILIKE ${"%" + city + "%"}` as any
      );
    }
    if (province) {
      query = query.where(
        sql`location->>'province' ILIKE ${"%" + province + "%"}` as any
      );
    }
    if (title) {
      query = query.where(sql`title ILIKE ${"%" + title + "%"}` as any);
    }

    // Execute the query
    return await query.execute();
  }

  public async getBrokerById(id: string) {
    const [broker] = await this.db
      .selectFrom(this.tableName)
      .innerJoin("users", "brokers.user_id" as `${string}.id`, "users.id")
      .selectAll("brokers")
      .select([
        "users.email",
        "users.name",
        "users.phone as phone",
        "users.picture as picture",
        "users.created_at as user_created_at",
        "users.updated_at as user_updated_at",
      ] as any)
      .where("brokers.id" as any, "=", id)
      .execute();

    return broker;
  }

  public async getBrokerByUserId(id: string) {
    return await this.db
      .selectFrom("brokers")
      .innerJoin("users", "brokers.user_id", "users.id")
      .selectAll("brokers")
      .select([
        "users.email",
        "users.name",
        "users.phone as phone",
        "users.picture as picture",
        "users.created_at as user_created_at",
        "users.updated_at as user_updated_at",
        "users.is_email_verified",
        "users.is_phone_verified",
        "users.dob",
      ] as any)
      .where("user_id", "=", id)
      .executeTakeFirst();
  }
}

export default new Broker();
