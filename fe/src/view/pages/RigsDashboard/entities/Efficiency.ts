import {UF} from "../../../../app/entities/Rig";

export type Efficiency = {
  availableHours: number;
  date: string | Date;
  id: string;
  rigId: string;
  userId: string;
  user: {name: string};
  rig: {name: string; state: UF};
  periods: {
    id: string;
    efficiencyId: string;
    startHour: string;
    endHour: string;
    type: "WORKING" | "GLOSS" | "REPAIR" | "DTM";
    classification: string;
    description: string;
  }[];
  equipmentRatio: {
    ratio: string;
  }[];
  fluidRatio: {
    ratio: string;
  }[];
};
