import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("isotopes", (isotopeTable) => {
    isotopeTable.integer("neutron_number").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("isotopes", (isotopeTable) => {
    isotopeTable.dropColumns("neutron_number");
  });
}
