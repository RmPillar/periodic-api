import { Request, Response, NextFunction } from "express";
import { fetchElements } from "../models/elements";
import { ElementType } from "../types/data";

export const getElements = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  fetchElements()
    .then((elements: ElementType[]) => {
      res.status(200).send(elements);
    })
    .catch(next);
};
