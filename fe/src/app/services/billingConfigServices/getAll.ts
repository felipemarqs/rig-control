import {httpClient} from "../httpClient";

export interface BillingConfigResponse {
  id: string;
  rig: {
    id: string;
    name: string;
  };
  availableHourTax: number;
  glossHourTax: number;
  dtmLt20Tax: number;
  dtmBt20And50Tax: number;
  dtmGt50Tax: number;
  fluidRatioLt20Tax: number;
  fluidRatioBt20And50Tax: number;
  fluidRatioGt50Tax: number;
  equipmentRatioLt20Tax: number;
  equipmentRatioBt20And50Tax: number;
  equipmentRatioGt50Tax: number;
  readjustment: number;
  mobilization: number;
  bobRentTax: number;
  christmasTreeDisassemblyTax: number;
  demobilization: number;
  dtmHourTax: number;
  extraTrailerTax: number;
  generatorFuelTax: number;
  mixTankDemobilizationTax: number;
  mixTankDtmTax: number;
  mixTankHourRentTax: number;
  mixTankMobilizationTax: number;
  mixTankMonthRentTax: number;
  mixTankOperatorTax: number;
  munckTax: number;
  powerSwivelTax: number;
  suckingTruckTax: number;
  transportationTax: number;
  truckCartRentTax: number;
  truckKmTax: number;
  truckTankTax: number;
}

export const getAll = async () => {
  const {data} = await httpClient.get<Array<BillingConfigResponse>>(
    `billings-config/`
  );

  return data;
};
