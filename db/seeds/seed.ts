import { Knex } from "knex";
import {
  elementData,
  isotopeData,
  oxidationStateData,
  ionisationEnergyData,
} from "../data/index";

exports.seed = function (knex: Knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex("elements").insert(elementData))
    .then(() => knex("isotopes").insert(isotopeData))
    .then(() => knex("oxidation_states").insert(oxidationStateData))
    .then(() => knex("ionisation_energies").insert(ionisationEnergyData));
};
