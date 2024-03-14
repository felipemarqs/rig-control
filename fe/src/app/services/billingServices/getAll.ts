import {httpClient} from "../httpClient";

export type BillingsFilters = {
  startDate: string;
  endDate: string;
};
export interface BillingResponse {
  availablehouramount: number;
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
  repairhouramount: number | null;
  rigid: string;
  rigname: string;
  total: number;
}

export const getAll = async (filters: BillingsFilters) => {
  const {data} = await httpClient.get<Array<BillingResponse>>(`/billings/all`, {
    params: filters,
  });

  return data;
};
