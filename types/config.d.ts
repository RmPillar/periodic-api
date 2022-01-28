import { Knex } from "knex";

export type CustomConfigType = {
  production: Knex.Config;
  development: Knex.Config;
};

export type BaseConfigType = Knex.Config;
