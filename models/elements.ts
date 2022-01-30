import connection from "../db/connection";
import { ElementType } from "../types/data";
import { fetchElementsTypes } from "../types/models";

export const fetchElements = ({
  sort_by = "element_id",
  order = "asc",
  limit = 10,
}: fetchElementsTypes): Promise<ElementType[]> => {
  return connection("elements")
    .select("*")
    .limit(limit)
    .orderBy(sort_by, order);
};
