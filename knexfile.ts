import { BaseConfigType, CustomConfigType } from "./types/config";

const { DB_URL, NODE_ENV = "development" } = process.env;

const baseConfig: BaseConfigType = {
  client: "pg",
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

const customConfig: CustomConfigType = {
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
