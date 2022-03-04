import { Knex } from "knex";
import { elementData, isotopeData } from "../data/index";

exports.seed = function (knex: Knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex("elements").insert(elementData))
    .then(() => knex("isotopes").insert(isotopeData));
};
