import { Request, Response, NextFunction } from "express";
import { fetchElements } from "../models/elements";
import { ElementType } from "../types/data";

export const getElements = (
  { query }: Request,
  res: Response,
  next: NextFunction
): void => {
  fetchElements(query)
    .then((elements: ElementType[]) => {
      res.status(200).send(elements);
    })
    .catch(next);
};
