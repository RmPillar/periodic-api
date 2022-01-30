import dotenv from "dotenv";
import express from "express";

import apiRouter from "./routes/api";

import {
  handle404s,
  handleCustomErrors,
  handle422s,
  handle400s,
  handle500s,
} from "./errors";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", apiRouter);

app.all("/*", handle404s);
app.use(handleCustomErrors);
app.use(handle422s);
app.use(handle400s);
app.use(handle500s);

export default app;
