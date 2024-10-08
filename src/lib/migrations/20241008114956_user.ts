import type { Knex } from "knex";

exports.up = function (knex: Knex) {
  return knex.schema.createTable("users", function (table) {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.string("auth0_sid").unique().notNullable();
    table.string("name").notNullable();
    table.string("email").unique().notNullable();
    table.enu("role", ["user", "lender", "broker"]).notNullable();
    table.string("profile_photo");
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable("users");
};
