import {Rig} from "./Rig";
import {User} from "./User";

export type PersistanceEfficiency = {
  availableHours: number;
  date: string | Date;
  id: string;
  well: string;
  rigId: string;
  userId: string;
  user: Partial<User>;
  rig: Partial<Rig>;
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
  well: string;
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
  isTruckCartSelected?: boolean;
  isTruckTankSelected?: boolean;
  isMunckSelected?: boolean;
  isTransportationSelected?: boolean;
  bobRentHours?: number;
  truckKm?: number;
  isExtraTrailerSelected?: boolean;
  isPowerSwivelSelected?: boolean;
  mobilizationPlace?: string;
  isSuckingTruckSelected?: boolean;
};
