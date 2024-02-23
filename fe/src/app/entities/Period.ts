import {PeriodType} from "./PeriodType";

export type Period = {
  id: string;
  startHour: string;
  endHour: string;
  classification: string;
  repairClassification: string | null;
  description: string;
  type: PeriodType;
  efficiencyId: string;
  well: {
    id: string;
    name: string;
  };
};
