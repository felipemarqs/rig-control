import {httpClient} from "../httpClient";

export type BillingsByRigIFilters = {
  rigId: string;
  startDate: string;
  endDate: string;
};
export interface BillingByRigIdResponse {
  availablehouramount: number;
  bobrentamount: number;
  christmastreedisassemblyamount: number;
  demobilizationamount: number;
  dtmhouramount: number;
  dtmbt20and50amount: number;
  dtmgt50amount: number;
  dtmlt20amount: number;
  equipmentbt20and50amount: number;
  equipmentgt50amount: number;
  equipmentlt20amount: number;
  extratraileramount: number;
  fluidbt20and50amount: number;
  fluidgt50amount: number;
  fluidlt20amount: number;
  generatorfuelamount: number;
  glosshouramount: number;
  mixtankdemobilizationamount: number;
  mixtankdtmamount: number;
  mixtankhourrentamount: number;
  mixtankmobilizationamount: number;
  mixtankmonthrentamount: number;
  mixtankoperatoramount: number;
  mobilizationamount: number;
  munckamount: number;
  powerswivelamount: number;
  rigid: string;
  rigname: string;
  suckingtruckamount: number;
  total: number;
  transportationamount: number;
  truckcartrentamount: number;
  truckkmamount: number;
  trucktankamount: number;
}

export const getbyRigId = async (filters: BillingsByRigIFilters) => {
  const {data} = await httpClient.get<Array<BillingByRigIdResponse>>(
    `/billings/`,
    {
      params: filters,
    }
  );

  return data;
};
