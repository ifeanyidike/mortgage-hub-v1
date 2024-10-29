import type { Knex } from "knex";

exports.up = function (knex: Knex) {
  return knex.schema
    .alterTable("brokers", (table) => {
      table.dropColumn("picture"); // Remove 'picture' from brokers
      table.string("company").alter(); // Change 'company' to string type
    })
    .alterTable("users", (table) => {
      table.string("picture").nullable(); // Add 'picture' column to users
    });
};

exports.down = function (knex: Knex) {
  return knex.schema
    .alterTable("brokers", (table) => {
      table.binary("picture").nullable(); // Re-add 'picture' to brokers (if needed)
      table.integer("company").alter(); // Change 'company' back to integer type
    })
    .alterTable("users", (table) => {
      table.dropColumn("picture"); // Remove 'picture' from users
    });
};
