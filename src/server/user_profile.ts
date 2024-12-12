// import db from "@/lib/db";

import DB from "@/lib/db";
import { Database, UserProfileUpdate } from "@/types/db";
import { Expression, OperationNode, RawBuilder, TableExpression } from "kysely";
import { ExpressionBuilder, StringReference, sql } from "kysely";

class RegularUserProfile extends DB {
  private tableName: TableExpression<Database, never> = "user_profile";
  constructor() {
    super();
  }

  public async createOne(user_id: string) {
    const userProfile = await this.db
      .insertInto("user_profile")
      .values({ user_id })
      .executeTakeFirst();

    return userProfile.insertId;
  }

  public async getOne(id: string) {
    return await this.db
      .selectFrom("user_profile")
      .innerJoin("users", "user_profile.user_id", "users.id")
      .selectAll("user_profile")
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

  public async updateOne(id: string, data: UserProfileUpdate) {
    console.log("data", data);
    console.log("profile data", await this.getOne(id));
    const userProfile = await this.db
      .updateTable("user_profile")
      .set(data)
      .where("user_id", "=", id)
      .execute();

    console.log("user profile update", userProfile);

    return userProfile;
  }

  public async upsert(id: string, data: UserProfileUpdate) {
    const userProfile = await this.db
      .insertInto("user_profile")
      .values({ user_id: id, ...(data as any) })
      .onConflict((oc) =>
        oc.column("user_id").doUpdateSet({
          ...data,
          updated_at: new Date(),
        })
      )
      .executeTakeFirst();

    console.log("User profile upsert:", userProfile);

    return userProfile;
  }
}

export const regularUserProfile = new RegularUserProfile();
