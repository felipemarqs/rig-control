import { RequestStatus } from "../../entities/RequestStatus";
import { httpClient } from "../httpClient";

export interface UpdateParams {
  id: string;
  efficiencyId: string;
  reason: string;
  status: RequestStatus;
}

export const update = async ({ id, ...params }: UpdateParams) => {
  //await timeout(1500);
  const { data } = await httpClient.put(`/deletion-request/${id}`, params);

  return data;
};
