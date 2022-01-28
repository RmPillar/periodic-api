const connection = require("knex");

const dbConfig =
  process.env.NODE_ENV === "production"
    ? {
        client: "pg",
        connection: process.env.DATABASE_URL,
        connectTimeout: 90000,
      }
    : require("../knexfile");

module.exports = connection(dbConfig);
