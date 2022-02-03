import { getSignArgs, getSignReturn } from "../types/utils";

export const getSign = (sign: getSignArgs): getSignReturn => {
  switch (sign) {
    case "gt":
      return ">";
    case "gte":
      return ">=";
    case "lt":
      return "<";
    case "lte":
      return "<=";
    case "e":
      return "=";
    default:
      return "=";
  }
};
