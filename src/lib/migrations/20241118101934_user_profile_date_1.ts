import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("user_profile", (table) => {
    table.json("location").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("user_profile", (table) => {
    table.dropColumn("location");
  });
}
