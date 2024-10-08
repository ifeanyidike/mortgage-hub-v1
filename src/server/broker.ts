// import db from "@/lib/db";

import DB from "@/lib/db";
import { Database } from "@/types/db";
import { TableExpression } from "kysely";

class Broker extends DB {
  private tableName: TableExpression<Database, never> = "brokers";
  constructor() {
    super();
  }
  public async getBrokers() {
    return await this.db.selectFrom(this.tableName).selectAll().execute();
  }
}

export default new Broker();
