import {periodClassifications} from "./periodClassifications";

export const translateGlossClassification = (glossClassification: string) => {
  const res = periodClassifications.GLOSS.find(
    ({id}) => id === glossClassification
  );

  if (res) {
    return res.classification;
  }

  return "-";
};
