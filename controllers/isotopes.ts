import { Request, Response, NextFunction } from "express";
import { fetchIsotopes } from "../models/isotopes";
import { IsotopeType } from "../types/data";

export const getIsotopes = (
  { query }: Request,
  res: Response,
  next: NextFunction
): void => {
  fetchIsotopes(query)
    .then((isotopes: IsotopeType[]) => {
      // console.log(elements, "<<<<<<");
      res.status(200).send(isotopes);
    })
    .catch(next);
};
