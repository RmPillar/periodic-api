import express from "express";
import { getElements, getElementsById } from "../controllers/elements";

const elementRouter = express.Router();

elementRouter.route("/").get(getElements);
elementRouter.route("/:element_id").get(getElementsById);

export default elementRouter;
