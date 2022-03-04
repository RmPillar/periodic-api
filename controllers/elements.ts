import { Request, Response, NextFunction } from "express";
import { fetchElements, fetchElementsById } from "../models/elements";
import { ElementType } from "../types/data";

export const getElements = (
  { query }: Request,
  res: Response,
  next: NextFunction
): void => {
  fetchElements(query)
    .then((elements: ElementType[]) => {
      // console.log(elements, "<<<<<<");
      res.status(200).send(elements);
    })
    .catch(next);
};

export const getElementsById = (
  { params }: Request,
  res: Response,
  next: NextFunction
) => {
  fetchElementsById(params.element_id)
    .then((elements: ElementType[]) => {
      res.status(200).send(elements);
    })
    .catch(next);
};
