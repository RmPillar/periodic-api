const { DB_URL, NODE_ENV = "development" } = process.env;
const ENV = process.env.NODE_ENV || "development";

type customConfigType = {
  production: {
    connection: String;
  };
  development: {
    connection: {
      database: String;
    };
  };
  test: {
    connection: {
      database: String;
    };
  };
};

type baseConfigType = {
  client: String;
  ssl: Boolean;
  migrations: {
    directory: String;
  };
  seeds: {
    directory: String;
  };
};

const baseConfig: baseConfigType = {
  client: "pg",
  ssl: true,
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
  test: {
    connection: {
      database: "periodic_test",
    },
  },
};

const config =
  ENV === "production" || ENV === "development" || ENV === "test"
    ? customConfig[ENV]
    : customConfig.development;

module.exports = { ...config, ...baseConfig };
