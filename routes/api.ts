import express from "express";
import elementRouter from "../routes/elements";
import isotopeRouter from "./isotopes";

const apiRouter = express.Router();

apiRouter.use("/elements", elementRouter);
apiRouter.use("/isotopes", isotopeRouter);

export default apiRouter;
