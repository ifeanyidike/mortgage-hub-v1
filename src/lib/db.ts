// src/lib/db.ts

import { Database } from "@/types/db";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

// Create a Kysely instance
// const db = new Kysely<Database>({
//   dialect: new PostgresDialect({
//     pool: new Pool({
//       host: process.env.DB_HOST,
//       database: process.env.DB_NAME,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//     }),
//   }),
// });

abstract class DB {
  protected db: Kysely<Database>;

  constructor() {
    this.db = new Kysely<Database>({
      dialect: new PostgresDialect({
        pool: new Pool({
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
        }),
      }),
      log: ["query", "error"],
    });
  }
}

export default DB;
