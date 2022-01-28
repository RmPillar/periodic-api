import { Knex } from "knex";
import elementData from "../data/elements";

exports.seed = function (knex: Knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex("elements").insert(elementData));
};
