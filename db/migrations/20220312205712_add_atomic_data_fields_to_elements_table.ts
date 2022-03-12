import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("elements", (elementsTable) => {
    elementsTable.decimal("atomic_radius", 8, 4);
    elementsTable.decimal("covalent_radius", 8, 4);
    elementsTable.decimal("electron_affinity", 8, 4);
    elementsTable.decimal("electronegativity", 8, 4);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("elements", (elementsTable) => {
    elementsTable.dropColumn("atomic_radius");
    elementsTable.dropColumn("covalent_radius");
    elementsTable.dropColumn("electron_affinity");
    elementsTable.dropColumn("electronegativity");
  });
}
