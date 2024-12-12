import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable("lead_documents", (table) => {
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
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable("lead_documents");
}
