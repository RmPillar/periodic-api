import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("elements", (elementTable) => {
    elementTable.integer("group").notNullable();
    elementTable.integer("period").notNullable();
    elementTable.string("block").notNullable();
    elementTable.string("state_room_temp");
    elementTable.decimal("melting_point", 8, 4);
    elementTable.decimal("boiling_point", 8, 4);
    elementTable.decimal("density", 10, 8);
    elementTable.string("appearance", 10000);
    elementTable.integer("discovery_date");
    elementTable.string("discovered_by");
    elementTable.string("name_origin");
    elementTable.string("uses", 10000);
    elementTable.string("electron_configuration");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("elements", (elementTable) => {
    elementTable.dropColumns(
      "group",
      "period",
      "block",
      "state_room_temp",
      "melting_point",
      "boiling_point",
      "density",
      "appearance",
      "discovery_date",
      "discovered_by",
      "name_origin",
      "uses",
      "electron_configuration"
    );
  });
}
