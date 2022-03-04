import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("elements", (elementTable) => {
    elementTable.string("classification");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("elements", (elementTable) => {
    elementTable.dropColumns("classification");
  });
}
