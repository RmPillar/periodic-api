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

export const modifyQuery = (param, field, query) => {
  const splitDate = param.split("_");
  splitDate.forEach((val) => {
    if (val.includes("-")) {
      const [comparison, value] = val.split("-");
      const sign = getSign(comparison);
      query.where(field, sign, value);
    } else {
      query.where(field, "=", val);
    }
  });
};
