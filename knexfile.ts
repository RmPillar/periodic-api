import { Knex } from "knex";

const { DB_URL, NODE_ENV = "development" } = process.env;

type customConfigType = {
  production: Knex.Config;
  development: Knex.Config;
};

const baseConfig: Knex.Config = {
  client: "pg",
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

const customConfig: customConfigType = {
  production: {
    connection: `${DB_URL}?ssl=true`,
  },
  development: {
    connection: {
      database: "periodic",
    },
  },
};

const config =
  NODE_ENV === "production" || NODE_ENV === "development"
    ? customConfig[NODE_ENV]
    : customConfig.development;

export default { ...config, ...baseConfig };
