import {allClassifications} from "./periodClassifications";

export const translateClassification = (classification: string) => {
  const res = allClassifications.find((classifications) => {
    if (classifications.id === classification) {
      return classification;
    }
  });

  return res?.classification;
};
