import {RepairClassification} from "../entities/RepairClassification";
import {periodClassifications} from "./periodClassifications";

export const translateRepairClassification = (
  repairClassification: RepairClassification
) => {
  for (let repair of periodClassifications.REPAIR) {
    const res = repair.repairClassification.find(
      ({value}) => value === repairClassification
    );

    if (res) {
      return res.label;
    }
  }

  return "-";
};
