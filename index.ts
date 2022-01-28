import dotenv from "dotenv";
import express from "express";

import apiRouter from "./routes/api";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", apiRouter);

export default app;
