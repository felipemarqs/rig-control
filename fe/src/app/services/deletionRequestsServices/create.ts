import {httpClient} from "../httpClient";

export interface ToPersistenceDeletionRequest {
  efficiencyId: string;
  reason: string;
}

export const create = async (params: ToPersistenceDeletionRequest) => {
  const {data} = await httpClient.post("/deletion-request", params);

  return data;
};
