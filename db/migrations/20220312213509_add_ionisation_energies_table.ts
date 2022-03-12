import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    "ionisation_energies",
    (ionisationEnergiesTable) => {
      ionisationEnergiesTable.increments("ionisation_energy_id").primary();
      ionisationEnergiesTable
        .integer("element_id")
        .references("elements.element_id")
        .onDelete("CASCADE")
        .notNullable();
      ionisationEnergiesTable.decimal("ionisation_energy", 16, 8).notNullable();
      ionisationEnergiesTable.integer("position").notNullable();
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("ionisation_energies");
}
