import express from "express";
import { getElements } from "../controllers/elements";

const elementRouter = express.Router();

elementRouter.route("/").get(getElements);

export default elementRouter;
