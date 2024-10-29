import type { Knex } from "knex";

exports.up = function (knex: Knex) {
  return knex.schema.alterTable("brokers", (table) => {
    // Drop columns that are no longer needed
    table.dropColumn("contact_email");
    table.dropColumn("phone");

    // Add new columns
    table.string("title").nullable(); // Title
    table.string("lic").nullable(); // LIC (License)
    table.specificType("service_areas", "text[]").nullable(); // Service areas
    table.string("fax").nullable(); // Fax number
    table.string("postal_code").nullable(); // Postal Code
    table.string("website").nullable(); // Website

    // Social media links
    table.json("social_links").nullable(); // JSON column to store all social links

    // Address and location
    table.json("location").nullable(); // JSON column to store locations - address, state, province

    // Other details
    table.string("broker_type").nullable(); // Type of broker
    table.text("description").nullable(); // Description
    table.string("picture").nullable(); // Picture URL or path
    table.string("broker_id").nullable(); // Broker ID
    table.boolean("is_company").nullable(); // Indicates if the broker is a company
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.alterTable("brokers", (table) => {
    // Remove newly added columns
    table.dropColumn("name");
    table.dropColumn("title");
    table.dropColumn("lic");
    table.dropColumn("service_areas");
    table.dropColumn("phone"); // Re-added in up, so should be dropped again here
    table.dropColumn("fax");
    table.dropColumn("postal_code");
    table.dropColumn("company");
    table.dropColumn("email");
    table.dropColumn("website");
    table.dropColumn("facebook");
    table.dropColumn("linkedin");
    table.dropColumn("instagram");
    table.dropColumn("social_link");
    table.dropColumn("address");
    table.dropColumn("state");
    table.dropColumn("province");
    table.dropColumn("broker_type");
    table.dropColumn("description");
    table.dropColumn("picture");
    table.dropColumn("broker_id");
    table.dropColumn("is_company");
  });
};
