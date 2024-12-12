import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("user_profile", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table
        .uuid("user_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.specificType("tools", "text[]").nullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .alterTable("brokers", (table) => {
      table.timestamp("updated_at");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable("user_profile")
    .alterTable("brokers", (table) => {
      table.dropColumn("updated_at");
    });
}
