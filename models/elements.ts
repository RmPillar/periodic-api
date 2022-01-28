import connection from "../db/connection";

interface ElementType {
  name: String;
  symbol: String;
  proton_number: Number;
  mass: Number;
}

export const fetchElements = (): Promise<ElementType[]> => {
  return connection("elements").select("*");
};
