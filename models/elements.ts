import connection from "../db/connection";
import { ElementType } from "../types/data";

export const fetchElements = (): Promise<ElementType[]> => {
  return connection("elements").select("*");
};
