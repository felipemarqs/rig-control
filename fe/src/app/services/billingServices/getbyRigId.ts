import {httpClient} from "../httpClient";

export type BillingsByRigIFilters = {
  rigId: string;
  startDate: string;
  endDate: string;
};
export interface BillingByRigIdResponse {
  data: any;
  /*   availablehouramount: number;
  dtmbt20and50amount: number;
  dtmgt50amount: number;
  dtmlt20amount: number;
  equipmentbt20and50amount: number;
  equipmentgt50amount: number;
  equipmentlt20amount: number;
  fluidbt20and50amount: number;
  fluidgt50amount: number;
  fluidlt20amount: number;
  glosshouramount: number;
  rigid: string;
  rigname: string;
  total: number; */
}

export const getbyRigId = async (filters: BillingsByRigIFilters) => {
  const {data} = await httpClient.get<Array<BillingByRigIdResponse>>(
    `/billings/`,
    {
      params: filters,
    }
  );

  return data[0];
};
