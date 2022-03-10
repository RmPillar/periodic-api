export type ElementType = {
  element_id: Number;
  name: String;
  symbol: String;
  proton_number: Number;
  mass: Number;
  group: Number;
  period: Number;
  block: String;
  state_room_temp: String | null;
  melting_point: String | null;
  boiling_point: String | null;
  density: String | null;
  appearance: String | null;
  discovery_date: Number | null;
  discovered_by: String | null;
  name_origin: String | null;
  uses: String | null;
  electron_configuration: String | null;
  isotopes: IsotopeType[];
};

export type IsotopeType = {
  element_id: Number;
  isotope_id: Number;
  name: String;
  mass: Number;
  natural_abundance: Number | null;
  half_life: String | null;
};
