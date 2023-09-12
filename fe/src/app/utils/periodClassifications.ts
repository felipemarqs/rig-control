const WORKING = [{ id: "WORKING", classification: "Operando" }];

const REPAIR = [
  { id: "RIG_CAR", classification: "Carro Sonda" },
  { id: "MAST", classification: "Mastro" },
  { id: "RIG_WINCH", classification: "Guincho Sonda" },
  { id: "RIG_TRANSMISSION", classification: "Transmissão Sonda" },
  { id: "UCI", classification: "UCI" },
  { id: "MUD_TANK", classification: "Tanque de Lama" },
  { id: "TRAILER", classification: "Reboque" },
  { id: "MUD_BOMB", classification: "Bomba de Lama" },
  { id: "PIPE_RACK", classification: "Rack de Tubos" },
  { id: "BOP", classification: "BOP" },
  { id: "CHOKE_MANIFOLD", classification: "Coletor de Estrangulamento" },
  { id: "HOSES", classification: "Mangueiras" },
  { id: "HYDRAULIC_WRENCH", classification: "Chave Hidráulica" },
  { id: "HANDLING_TOOLS", classification: "Ferramentas de Manuseio" },
  { id: "OTHERS", classification: "Outros" },
];

const GLOSS = [
  { id: "LABOR", classification: "Mão de Obra" },
  { id: "PROCESS", classification: "Processo" },
  { id: "LOGISTICS", classification: "Logística" },
  { id: "SECURITY", classification: "Segurança" },
];

const INTERVAL = [
  { id: "LT20", classification: "0 > 20" },
  { id: "BT20AND50", classification: "20 > 50" },
  { id: "GT50", classification: "50 >" },
];

export const periodClassifications = {
  WORKING: WORKING,
  REPAIR: REPAIR,
  INTERVAL: INTERVAL,
  GLOSS: GLOSS,
};

export const allClassifications = WORKING.concat(REPAIR, GLOSS, INTERVAL);

/* WORKING
  LABOR
  PROCESS
  LOGISTICS
  SECURITY


  RIG_CAR
  MAST
  RIG_WINCH
  RIG_TRANSMISSION
  UCI
  MUD_TANK
  TRAILER
  MUD_BOMB
  PIPE_RACK
  BOP
  CHOKE_MANIFOLD
  HOSES
  HYDRAULIC_WRENCH
  HANDLING_TOOLS
  LT20
  BT20AND50
  GT50
  OTHERS */

export const getPeriodClassification = (
  parameter: "WORKING" | "REPAIR" | "GLOSS" | "DTM" | string
) => {
  if (parameter === "WORKING") {
    return periodClassifications.WORKING.map(({ id, classification }) => {
      return {
        value: id,
        label: classification,
      };
    });
  }

  if (parameter === "DTM") {
    return periodClassifications.INTERVAL.map(({ id, classification }) => {
      return {
        value: id,
        label: classification,
      };
    });
  }

  if (parameter === "REPAIR") {
    return periodClassifications.REPAIR.map(({ id, classification }) => {
      return {
        value: id,
        label: classification,
      };
    });
  }

  if (parameter === "GLOSS") {
    return periodClassifications.GLOSS.map(({ id, classification }) => {
      return {
        value: id,
        label: classification,
      };
    });
  }

  return [
    {
      value: "",
      label: " ",
    },
  ];
};
