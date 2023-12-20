import {UF} from "./Rig";

export type PersistanceEfficiency = {
  availableHours: number;
  date: string | Date;
  id: string;
  well: string;
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
    repairClassification: string | null;
  }[];
  equipmentRatio: {
    ratio: string;
  }[];
  fluidRatio: {
    ratio: string;
  }[];
  christmasTreeDisassemblyHours: boolean;
  bobRentHours: boolean;
  hasDemobilization: boolean;
  hasExtraTrailer: boolean;
  hasGeneratorFuel: boolean;
  hasMixTankDemobilization: boolean;
  hasMixTankDtm: boolean;
  hasMixTankHourRent: boolean;
  hasMixTankMobilization: boolean;
  hasMixTankMonthRent: boolean;
  hasMixTankOperator: boolean;
  hasMunck: boolean;
  hasPowerSwivel: boolean;
  hasSuckingTruck: boolean;
  hasTransportation: boolean;
  hasTruckCartRent: boolean;
  truckKmHours: boolean;
  hasTruckTank: boolean;
  Billing: {
    availableHourAmount: number;
    mobilizationAmount: number;
    demobilizationAmount: number;
    extraTrailerAmount: number;
    powerSwivelAmount: number;
    truckCartRentAmount: number;
    transportationAmount: number;
    bobRentAmount: number;
    mixTankMonthRentAmount: number;
    mixTankHourRentAmount: number;
    mixTankOperatorAmount: number;
    mixTankDemobilizationAmount: number;
    mixTankDtmAmount: number;
    mixTankMobilizationAmount: number;
    christmasTreeDisassemblyAmount: number;
  };
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
