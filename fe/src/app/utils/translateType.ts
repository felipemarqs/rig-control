export const translateType = (type: "DTM" | "GLOSS" | "REPAIR" | "WORKING") => {
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
};
