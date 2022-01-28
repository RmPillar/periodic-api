import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("elements", (elementTable) => {
    elementTable.increments("element_id").primary();
    elementTable.string("name").notNullable();
    elementTable.string("symbol").notNullable();
    elementTable.integer("proton_number").notNullable();
    elementTable.decimal("mass", 8, 4).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("elements");
}
