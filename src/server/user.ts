import DB from "@/lib/db";
import { Database } from "@/types/db";
import { TableExpression } from "kysely";

class User extends DB {
  constructor() {
    super();
  }
  public async getUsers() {
    return await this.db.selectFrom("users").selectAll().execute();
  }
  public async createUser() {
    return await this.db
      .insertInto("users")
      .values({
        email: "ifeanyidike87@gmail.com",
        name: "Ifeanyi Dike",
        role: "broker",
        auth0_sid: "auth0_a829292aia",
        profile_photo: "https://example.com/profile_photo.jpg",
      })
      .returning("id")
      .execute();
  }
}

export default new User();
