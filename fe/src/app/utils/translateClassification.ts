import { allClassifications } from "./periodClassifications";

export const translateClassification = (classification: string) => {
  const res = allClassifications.find((classifications) => {
    if (classifications.id === classification) {
      return classification;
    }
  });

  return res?.classification;
};

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
