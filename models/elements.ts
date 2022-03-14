import connection from "../db/connection";
import { ElementType } from "../types/data";
import { fetchElementsTypes } from "../types/models";
import { modifyQuery } from "../utils";

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
  atomic_radius,
  covalent_radius,
  electron_affinity,
  electronegativity,
}: fetchElementsTypes) => {
  console.log(sort_by);
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
      if (atomic_radius) {
        modifyQuery(atomic_radius, "atomic_radius", query);
      }
      if (covalent_radius) {
        modifyQuery(covalent_radius, "covalent_radius", query);
      }
      if (electron_affinity) {
        modifyQuery(electron_affinity, "electron_affinity", query);
      }
      if (electronegativity) {
        modifyQuery(electronegativity, "electronegativity", query);
      }
    })
    .limit(limit)
    .orderBy(sort_by, order);

  const isotopes = await connection("isotopes").select("*");
  const oxidationStates = await connection("oxidation_states").select("*");
  const ionisationEnergies = await connection("ionisation_energies").select(
    "*"
  );

  return elements.map((element) => {
    return {
      ...element,
      isotopes: isotopes.filter(
        (isotope) => isotope.element_id === element.element_id
      ),
      key_isotope: isotopes.find(
        (isotope) => isotope.element_id === element.element_id
      ),
      oxidation_states: oxidationStates.filter(
        (oxidationState) => oxidationState.element_id === element.element_id
      ),
      ionisation_energies: ionisationEnergies.filter(
        (ionisationEnergy) => ionisationEnergy.element_id === element.element_id
      ),
    };
  });
};

export const fetchElementsById = async (element_id: string) => {
  console.log(element_id);
  const element = await connection("elements")
    .select("*")
    .where({ element_id });

  if (element.length === 0) {
    return Promise.reject({
      status: 404,
      msg: "Element Not Found",
    });
  }

  const isotopes = await connection("isotopes")
    .select("*")
    .where({ element_id });
  const oxidation_states = await connection("oxidation_states")
    .select("*")
    .where({ element_id });
  const ionisation_energies = await connection("ionisation_energies")
    .select("*")
    .where({ element_id });

  return {
    ...element[0],
    isotopes,
    oxidation_states,
    ionisation_energies,
  };
};
