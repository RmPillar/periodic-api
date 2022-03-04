import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("isotopes", (isotopeTable) => {
    isotopeTable
      .integer("element_id")
      .references("elements.element_id")
      .onDelete("CASCADE")
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("isotopes", (isotopesTable) => {
    isotopesTable.dropColumn("element_id");
  });
}
