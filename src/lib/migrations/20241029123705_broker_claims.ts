import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table) => {
    table.enu("account_status", ["pending_claim", "claimed"]);
    table.string("claim_token").unique();
    table.timestamp("claimed_at");
    table.timestamp("claim_token_expires_at");

    // Make password nullable
    table.string("password").nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("account_status");
    table.dropColumn("claim_token");
    table.dropColumn("claimed_at");
    table.dropColumn("claim_token_expires_at");

    // Make password non-nullable
    table.string("password").notNullable().alter();
  });
}
