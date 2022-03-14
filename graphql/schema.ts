import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Element {
    element_id: ID
    name: String
    symbol: String
    proton_number: Int
    mass: Float
    group: Int
    period: Int
    block: String
    state_room_temp: String
    boiling_point: Float
    melting_point: Float
    density: Float
    appearance: String
    discovery_date: Int
    discovered_by: String
    name_origin: String
    uses: String
    electron_configuration: String
    classification: String
    neutron_number: Int
    atomic_radius: Float
    covalent_radius: Float
    electron_affinity: Float
    electronegativity: Float
    key_isotope: Isotope
    isotopes: [Isotope]
    oxidation_states: [OxidationState]
    ionisation_energies: [IonisationEnergy]
  }

  type Isotope {
    isotope_id: ID
    element_id: Int
    name: String
    mass: Float
    natural_abundance: Float
    half_life: String
    neutron_number: Int
  }

  type OxidationState {
    oxidation_state_id: ID
    element_id: Int
    oxidation_state: Int
  }

  type IonisationEnergy {
    ionisation_energy_id: ID
    element_id: Int
    ionisation_energy: Float
    position: Int
  }

  type Query {
    element(id: ID!): Element

    elements(sort_by: String,
    order: String,
    limit: String,
    group: String,
    period: String,
    block: String,
    discovery_date: String,
    state_room_temp: String,
    melting_point: String,
    boiling_point: String,
    density: String,
    mass: String,
    neutron_number: String,
    atomic_radius: String,
    covalent_radius: String,
    electron_affinity: String,
    electronegativity: String): [Element]

    isotope(id: ID!): Isotope

    isotopes(element_id: Int,
    sort_by: String,
    order: String,
    limit: String, 
    mass: String,
    neutron_number: String,
    natural_abundance: String): [Isotope]
  }
`);

export default schema;
