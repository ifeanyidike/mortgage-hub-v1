import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("user_profile", (table) => {
    table.dropColumn("tools");
    table.jsonb("tools_selection");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("user_profile", (table) => {
    table.dropColumn("tools_selection");
    table.specificType("tools", "text[]").nullable();
  });
}
