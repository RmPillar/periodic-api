import { fetchElements, fetchElementsById } from "../models/elements";
import { fetchIsotopes, fetchIsotopesById } from "../models/isotopes";

const resolvers = {
  elements: ({
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
  }) => {
    return fetchElements({
      sort_by,
      order,
      limit,
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
    });
  },
  element: ({ id }) => {
    return fetchElementsById(id);
  },

  isotope: ({ id }) => {
    return fetchIsotopesById(id);
  },

  isotopes: ({ element_id, sort_by, order, limit, mass, neutron_number }) => {
    return fetchIsotopes({
      element_id,
      sort_by,
      order,
      limit,
      mass,
      neutron_number,
    });
  },
};

export default resolvers;
