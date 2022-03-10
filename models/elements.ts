import connection from "../db/connection";
import { ElementType } from "../types/data";
import { fetchElementsTypes } from "../types/models";
import { getSign, modifyQuery } from "../utils";

export const fetchElements = async ({
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
  neutron_number,
}: fetchElementsTypes) => {
  const elements = await connection("elements")
    .select("*")
    .modify((query) => {
      if (group) {
        modifyQuery(group, "group", query);
      }
      if (period) {
        modifyQuery(period, "period", query);
      }
      if (block) {
        query.where({ block });
      }
      if (discovery_date) {
        modifyQuery(discovery_date, "discovery_date", query);
      }
      if (state_room_temp) {
        query.where({ state_room_temp });
      }
      if (melting_point) {
        modifyQuery(melting_point, "melting_point", query);
      }
      if (boiling_point) {
        modifyQuery(boiling_point, "boiling_point", query);
      }
      if (density) {
        modifyQuery(density, "density", query);
      }
      if (mass) {
        modifyQuery(mass, "mass", query);
      }
      if (neutron_number) {
        modifyQuery(neutron_number, "neutron_number", query);
      }
    })
    .limit(limit)
    .orderBy(sort_by, order);

  const isotopes = await connection("isotopes").select(
    "isotope_id",
    "element_id",
    "name",
    "mass",
    "natural_abundance",
    "half_life"
  );

  return elements.map((element) => {
    return {
      ...element,
      isotopes: isotopes.filter(
        (isotope) => isotope.element_id === element.element_id
      ),
    };
  });
};

export const fetchElementsById = (
  element_id: string
): Promise<ElementType[]> => {
  return connection("elements")
    .select("*")
    .where({ element_id })
    .then((elements) => {
      if (elements.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Element Not Found",
        });
      } else return elements;
    });
};
