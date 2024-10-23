import DB from "@/lib/db";
import { AccountUpdate, NewAccount } from "@/types/db";

class Account extends DB {
  constructor() {
    super();
  }
  public async getAll() {
    return await this.db.selectFrom("accounts").selectAll().execute();
  }

  public async findByEmailAndProvider(
    email: string,
    provider: "google" | "credentials"
  ) {
    return await this.db
      .selectFrom("accounts")
      .selectAll()
      .where("email", "=", email)
      .where("provider", "=", provider)
      .executeTakeFirst();
  }

  public async findByEmail(email: string) {
    return await this.db
      .selectFrom("accounts")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();
  }

  public async updateOne(data: AccountUpdate, id: number) {
    await this.db
      .updateTable("accounts")
      .set({ ...data })
      .where("id", "=", id)
      .execute();
  }

  public async createOne(data: NewAccount) {
    await this.db
      .insertInto("accounts")
      .values({ ...data })
      .execute();
  }
}

export default new Account();
