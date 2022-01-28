import connection from "knex";
import knexfile from "../knexfile";

const dbConfig =
  process.env.NODE_ENV === "production"
    ? {
        client: "pg",
        connection: process.env.DATABASE_URL,
        connectTimeout: 90000,
      }
    : knexfile;

export default connection(dbConfig);
