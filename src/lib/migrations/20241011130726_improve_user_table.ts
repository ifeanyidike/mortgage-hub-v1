import type { Knex } from "knex";

exports.up = async function (knex: Knex) {
  await knex.schema.alterTable("users", function (table) {
    table.string("phone").unique().nullable(); // Add phone column
    table.boolean("is_email_verified").defaultTo(false);
    table.boolean("is_phone_verified").defaultTo(false);
    table.dropColumn("is_verified");
  });

  // If you need to alter the `accounts` table, add more changes here.
};

exports.down = async function (knex: Knex) {
  await knex.schema.alterTable("users", function (table) {
    table.dropColumn("phone");
    table.dropColumn("is_email_verified");
    table.dropColumn("is_phone_verified");
  });

  // If you added any changes to `accounts`, revert them here.
};
