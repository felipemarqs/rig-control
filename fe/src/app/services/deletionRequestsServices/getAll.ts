import {DeletionRequest} from "../../entities/DeletionRequest";
import {httpClient} from "../httpClient";

export type DeletionRequestsResponse = Array<DeletionRequest>;

export const getAll = async () => {
  const {data} = await httpClient.get<DeletionRequestsResponse>(
    `/deletion-request/`
  );

  return data;
};
