import type { Knex } from "knex";

exports.up = function (knex: Knex) {
  return knex.schema.createTable("brokers", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.string("license_number").notNullable();
    table.integer("experience_years").notNullable();
    table.enu("status", ["active", "suspended"]).defaultTo("active");
    table.decimal("commission_rate", 5, 2).defaultTo(0.0);
    table.timestamp("joined_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable("brokers");
};
