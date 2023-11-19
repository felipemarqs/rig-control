import {DeletionRequest} from "../../entities/DeletionRequest";
import {httpClient} from "../httpClient";

export type DeletionRequestsResponse = Array<DeletionRequest>;

export interface deletionRequestFilters {
  status?: string;
}

export const getAll = async (filters: deletionRequestFilters) => {
  const {data} = await httpClient.get<DeletionRequestsResponse>(
    `/deletion-request/`,
    {
      params: filters,
    }
  );

  return data;
};
