import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("purchases", (table) => {
    table.decimal("amount_paid", 15, 2).notNullable().defaultTo(0);
    table.string("currency").defaultTo("cad");
    table.string("payment_method").defaultTo("card");
    table.string("lead_type").defaultTo("shared");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("purchases", (table) => {
    table.dropColumn("amount_paid");
    table.dropColumn("currency");
    table.dropColumn("payment_method");
    table.dropColumn("lead_type");
    table.dropTimestamps(true);
  });
}
