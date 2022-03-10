import express from "express";
import { getIsotopes } from "../controllers/isotopes";

const isotopeRouter = express.Router();

isotopeRouter.route("/").get(getIsotopes);

export default isotopeRouter;
