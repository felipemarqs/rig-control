import {PeriodType} from "../../entities/PeriodType";
import {UF} from "../../entities/Rig";
import {httpClient} from "../httpClient";

export type TemporaryEfficiencyResponse = {
  availableHours: number;
  date: string | Date;
  id: string;
  well: string;
  rigId: string;
  userId: string;
  user: {name: string};
  rig: {name: string; state: UF};
  temporaryPeriods: {
    id: string;
    efficiencyId: string;
    startHour: string;
    endHour: string;
    type: PeriodType;
    classification: string;
    description: string;
    repairClassification: string | null;
    well: {
      id: string;
      name: string;
    };
  }[];
  equipmentRatio: {
    ratio: string;
  }[];
  fluidRatio: {
    ratio: string;
  }[];
  dtmHours: number;
  christmasTreeDisassemblyHours: number;
  bobRentHours: number;
  hasDemobilization: boolean;
  hasMobilization: boolean | null;
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
  truckKmHours: number;
  hasTruckTank: boolean;
};

export const getById = async (efficiencyId: string) => {
  const {data} = await httpClient.get<TemporaryEfficiencyResponse>(
    `/temporary-efficiencies/${efficiencyId}`
  );

  return data;
};
