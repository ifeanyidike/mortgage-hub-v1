import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("user_profile", (table) => {
      table.unique("user_id");
    })
    .alterTable("brokers", (table) => {
      table.unique("user_id");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("user_profile", (table) => {
      table.dropUnique(["user_id"]);
    })
    .alterTable("brokers", (table) => {
      table.dropUnique(["user_id"]);
    });
}
