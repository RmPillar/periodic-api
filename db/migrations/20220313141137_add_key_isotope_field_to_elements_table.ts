import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("elements", (elementsTable) => {
    elementsTable.integer("key_isotope").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("elements", (elementsTable) => {
    elementsTable.dropColumn("key_isotope");
  });
}
