import {PeriodType} from "../entities/PeriodType";

export const translateType = (type: PeriodType) => {
  if (type === "DTM") {
    return type;
  }
  if (type === "GLOSS") {
    return "Glosa";
  }
  if (type === "REPAIR") {
    return "Reparo";
  }
  if (type === "WORKING") {
    return "Operando";
  }
  if (type === "SCHEDULED_STOP") {
    return "Parada de Manutenção";
  }
};
