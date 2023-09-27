import {UF} from "./Rig";

export type PersistanceEfficiency = {
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
    type: string;
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

export type ToPersistanceEfficiency = {
  availableHours: number;
  date: string | Date;
  rigId: string;
  periods: {
    startHour: string;
    endHour: string;
    type: string;
    classification: string;
    description: string | undefined;
  }[];
  equipmentRatio: {
    ratio: string;
  }[];
  fluidRatio: {
    ratio: string;
  }[];
  christmasTreeDisassemblyHours?: number;
  isMixTankSelected?: boolean;
  isMixTankOperatorsSelected?: boolean;
  isMixTankMonthSelected?: boolean;
  isFuelGeneratorSelected?: boolean;
  isMobilizationSelected?: boolean;
  isDemobilizationSelected?: boolean;
  isTankMixMobilizationSelected?: boolean;
  isTankMixDemobilizationSelected?: boolean;
  isTankMixDTMSelected?: boolean;
  bobRentHours?: number;
};
