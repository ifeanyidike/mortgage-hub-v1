import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("leads", (table) => {
    table.dropColumn("type");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("leads", (table) => {
    table.enu("type", ["shared", "exclusive"]).notNullable();
  });
}
