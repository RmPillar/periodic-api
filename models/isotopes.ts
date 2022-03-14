import connection from "../db/connection";
import { fetchIsotopesTypes } from "../types/models";
import { modifyQuery } from "../utils";

export const fetchIsotopes = async ({
  element_id,
  p = 1,
  sort_by = "isotope_id",
  order = "asc",
  limit = 10,
  mass,
  neutron_number,
  natural_abundance,
}: fetchIsotopesTypes) => {
  return connection("isotopes")
    .select("*")
    .modify((query) => {
      if (element_id) {
        query.where({ element_id });
      }
      if (mass) {
        modifyQuery(mass, "mass", query);
      }
      if (natural_abundance) {
        modifyQuery(natural_abundance, "natural_abundance", query);
      }
      if (neutron_number) {
        modifyQuery(neutron_number, "neutron_number", query);
      }
    })
    .orderBy(sort_by, order)
    .limit(limit)
    .offset(p * limit - limit);
};

export const fetchIsotopesById = async (isotope_id: string) => {
  const isotope = await connection("isotopes")
    .select("*")
    .where({ isotope_id });

  if (isotope.length === 0) {
    return Promise.reject({
      status: 404,
      msg: "Isotope Not Found",
    });
  }

  return isotope[0];
};
