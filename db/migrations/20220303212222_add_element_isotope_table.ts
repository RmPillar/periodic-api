import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("element_isotope", (elementIsotopeTable) => {
    elementIsotopeTable.increments("element_isotope_id").primary();
    elementIsotopeTable
      .integer("element_id")
      .references("elements.element_id")
      .onDelete("CASCADE")
      .notNullable();
    elementIsotopeTable
      .integer("isotope_id")
      .references("isotopes.isotope_id")
      .onDelete("CASCADE")
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("element_isotope");
}
