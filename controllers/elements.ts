import { Request, Response, NextFunction } from "express";
import { fetchElements } from "../models/elements";

export const getElements = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  fetchElements()
    .then((elements: unknown) => {
      res.status(200).send({ elements });
    })
    .catch(next);
};
