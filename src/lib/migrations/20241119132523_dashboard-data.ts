import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable("documents", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.string("url").notNullable();
    table.string("type").nullable();
    table.integer("size").nullable();
    table.string("description").nullable();
    table.timestamps(true, true);
  });

  // Create leads table
  await knex.schema.createTable("leads", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.decimal("down_payment", 15, 2).nullable();
    table.decimal("property_price", 15, 2).notNullable();
    table.string("down_payment_source", 100).nullable();
    table.string("property_type", 100).nullable();
    table.string("property_address", 255).nullable();
    table.enu("type", ["shared", "exclusive"]).notNullable();
    table.boolean("is_sold").defaultTo(false);
    table.timestamps(true, true);
  });

  // Create purchases table
  await knex.schema.createTable("purchases", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid()); // Purchase ID

    table
      .uuid("lead_id")
      .notNullable()
      .references("id")
      .inTable("leads")
      .onDelete("CASCADE");
    table
      .uuid("broker_id")
      .notNullable()
      .references("id")
      .inTable("brokers")
      .onDelete("CASCADE");
    table.timestamp("purchased_at").defaultTo(knex.fn.now());
  });

  await knex.schema.alterTable("user_profile", (table) => {
    table.bigInteger("goal");
    table.string("social_insurance_number", 15).nullable();
    table.string("postal_code", 20).nullable();

    // Employment and Income Details
    table.string("employer_name", 255).nullable();
    table.string("job_title", 100).nullable();
    table.decimal("annual_income", 15, 2).nullable();
    table.date("employment_start_date").nullable();

    // Financial Information
    table.decimal("savings_amount", 15, 2).nullable();
    table.decimal("credit_card_balance", 15, 2).nullable();
    table.decimal("other_debt", 15, 2).nullable();

    // Credit History
    table.boolean("credit_check_consent").defaultTo(false);
    table.string("credit_score", 10).nullable();

    // Mortgage-Specific Information
    table.decimal("down_payment", 15, 2).nullable();
    table.string("down_payment_source", 100).nullable();
    table.string("intended_property_type", 100).nullable();
    table.string("intended_property_address", 255).nullable();
    table.decimal("intended_property_price", 15, 2).nullable();

    // Marital and Family Status
    table.string("marital_status", 50).nullable();
    table.integer("number_of_dependents").nullable();

    // Legal and Residency Status
    table.string("residency_status", 50).nullable(); // e.g., Citizen, PR, Work Permit
    table.string("government_id_type", 50).nullable(); // e.g., Passport, Driver's License
    table.string("government_id_number", 50).nullable(); // Optional ID number

    // // Timestamps
    // table.timestamps(true, true); // created_at and updated_at
  });

  await knex.schema.createTable("messages", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.uuid("sender_id").notNullable();
    table.uuid("receiver_id").notNullable();
    table.text("content").notNullable();
    table.boolean("is_read").defaultTo(false);
    table.timestamp("sent_at").defaultTo(knex.fn.now());

    // Foreign keys
    table
      .foreign("sender_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .foreign("receiver_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("purchases");
  await knex.schema.dropTableIfExists("leads");
  await knex.schema.dropTableIfExists("documents");
  await knex.schema.dropTableIfExists("messages");
  await knex.schema.alterTable("user_profile", (table) => {
    table.dropColumn("goal");
    table.dropColumn("government_id_number");
    table.dropColumn("government_id_type");
    table.dropColumn("residency_status");
    table.dropColumn("number_of_dependents");
    table.dropColumn("marital_status");
    table.dropColumn("intended_property_price");
    table.dropColumn("intended_property_address");
    table.dropColumn("intended_property_type");
    table.dropColumn("down_payment_source");
    table.dropColumn("down_payment");
    table.dropColumn("credit_score");
    table.dropColumn("credit_check_consent");
    table.dropColumn("other_debt");
    table.dropColumn("credit_card_balance");
    table.dropColumn("savings_amount");
    table.dropColumn("employment_start_date");
    table.dropColumn("annual_income");
    table.dropColumn("job_title");
    table.dropColumn("employer_name");
    table.dropColumn("postal_code");
    table.dropColumn("social_insurance_number");
  });
}
