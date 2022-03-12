import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("oxidation_states", (oxidationStateTable) => {
    oxidationStateTable.increments("oxidation_state_id").primary();
    oxidationStateTable
      .integer("element_id")
      .references("elements.element_id")
      .onDelete("CASCADE")
      .notNullable();
    oxidationStateTable.string("oxidation_state").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("oxidation_states");
}
