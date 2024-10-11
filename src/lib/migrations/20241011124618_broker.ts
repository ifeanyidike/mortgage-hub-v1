import type { Knex } from "knex";

exports.up = function (knex: Knex) {
  return knex.schema.createTable("brokers", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("totp_secret");
    table.boolean("is_totp_verified").defaultTo(false);
    table.string("name").notNullable();
    table.string("phone").notNullable();
    table.string("contact_email").nullable();
    table.integer("company").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable("brokers");
};
