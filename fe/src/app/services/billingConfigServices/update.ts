import {httpClient} from "../httpClient";

export interface BillingConfigResponse {
  id: string;
  rigId: string;
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
}

export const update = async ({id, ...params}: BillingConfigResponse) => {
  //await timeout(1500);
  const {data} = await httpClient.put(`/billings-config/${id}`, params);

  return data;
};
