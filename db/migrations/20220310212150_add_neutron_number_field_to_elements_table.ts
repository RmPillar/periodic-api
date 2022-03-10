import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("elements", (elementTable) => {
    elementTable.integer("neutron_number").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("elements", (elementTable) => {
    elementTable.dropColumns("neutron_number");
  });
}
