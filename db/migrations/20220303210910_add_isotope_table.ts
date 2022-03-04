import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("isotopes", (isotopeTable) => {
    isotopeTable.increments("isotope_id").primary();
    isotopeTable.string("name").notNullable();
    isotopeTable.decimal("mass", 8, 4).notNullable();
    isotopeTable.decimal("natural_abundance", 8, 4);
    isotopeTable.string("half_life");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("isotopes");
}
