import type { Knex } from "knex";

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.string("email").unique().notNullable();
      table.string("password");
      table
        .enu("role", ["user", "lender", "broker"])
        .defaultTo("user")
        .notNullable();
      table.string("phone").unique();
      table.boolean("is_email_verified").defaultTo(false);
      table.boolean("is_phone_verified").defaultTo(false);
      table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
      table.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
    })
    .createTable("accounts", function (table) {
      table.increments("id").primary();
      table
        .uuid("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("provider").notNullable();
      table.string("email").notNullable();
      table.string("access_token").notNullable();
      table.string("refresh_token");
      table.timestamp("access_token_expires_at"); // Optional
      table.timestamps(true, true);
    });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable("users").dropTable("accounts");
};
