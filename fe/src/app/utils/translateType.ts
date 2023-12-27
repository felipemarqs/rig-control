export const translateType = (
  type: "DTM" | "GLOSS" | "REPAIR" | "WORKING" | "SCHEDULED_STOP"
) => {
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
