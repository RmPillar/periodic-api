import connection from "../db/connection";
import { ElementType } from "../types/data";
import { fetchElementsTypes } from "../types/models";
import { getSign } from "../utils";

export const fetchElements = ({
  sort_by = "element_id",
  order = "asc",
  limit = 10,
  group,
  period,
  block,
  discovery_date,
  state_room_temp,
  melting_point,
  boiling_point,
  density,
  mass,
}: fetchElementsTypes): Promise<ElementType[]> => {
  return connection("elements")
    .select("*")
    .modify((query) => {
      if (group) {
        const splitDate = group.split("_");
        splitDate.forEach((val) => {
          if (val.includes("-")) {
            const [comparison, value] = val.split("-");
            const sign = getSign(comparison);
            query.where("group", sign, value);
          } else {
            query.where("group", "=", val);
          }
        });
      }
      if (period) {
        const splitDate = period.split("_");
        splitDate.forEach((val) => {
          if (val.includes("-")) {
            const [comparison, value] = val.split("-");
            const sign = getSign(comparison);
            query.where("period", sign, value);
          } else {
            query.where("period", "=", val);
          }
        });
      }
      if (block) {
        query.where({ block });
      }
      if (discovery_date) {
        const splitDate = discovery_date.split("_");
        splitDate.forEach((date) => {
          if (date.includes("-")) {
            const [comparison, value] = date.split("-");
            const sign = getSign(comparison);
            query.where("discovery_date", sign, value);
          } else {
            query.where("discovery_date", "=", date);
          }
        });
      }
      if (state_room_temp) {
        query.where({ state_room_temp });
      }
      if (melting_point) {
        const splitDate = melting_point.split("_");
        splitDate.forEach((temp) => {
          if (temp.includes("-")) {
            const [comparison, value] = temp.split("-");
            const sign = getSign(comparison);
            query.where("melting_point", sign, value);
          } else {
            query.where("melting_point", "=", temp);
          }
        });
      }
      if (boiling_point) {
        const splitDate = boiling_point.split("_");
        splitDate.forEach((temp) => {
          if (temp.includes("-")) {
            const [comparison, value] = temp.split("-");
            const sign = getSign(comparison);
            query.where("boiling_point", sign, value);
          } else {
            query.where("boiling_point", "=", temp);
          }
        });
      }
      if (density) {
        const splitDate = density.split("_");
        splitDate.forEach((val) => {
          if (val.includes("-")) {
            const [comparison, value] = val.split("-");
            const sign = getSign(comparison);
            query.where("density", sign, value);
          } else {
            query.where("density", "=", val);
          }
        });
      }
      if (mass) {
        const splitDate = mass.split("_");
        splitDate.forEach((val) => {
          if (val.includes("-")) {
            const [comparison, value] = val.split("-");
            const sign = getSign(comparison);
            query.where("mass", sign, value);
          } else {
            query.where("mass", "=", val);
          }
        });
      }
    })
    .limit(limit)
    .orderBy(sort_by, order);
};
