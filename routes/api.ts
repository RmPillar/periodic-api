import express from "express";
import elementRouter from "../routes/elements";

const apiRouter = express.Router();

apiRouter.use("/elements", elementRouter);

export default apiRouter;
