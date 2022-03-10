import connection from "../db/connection";
import { fetchIsotopesTypes } from "../types/models";
import { modifyQuery } from "../utils";

export const fetchIsotopes = async ({
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
    .limit(limit)
    .orderBy(sort_by, order);
};
