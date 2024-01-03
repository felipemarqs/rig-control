import {PersistanceEfficiency} from "../../entities/PersistanceEfficiency";
import {httpClient} from "../httpClient";

export type EfficienciesFilters = {
  rigId: string;
  startDate: string;
  endDate: string;
};

export type EfficienciesResponse = Array<PersistanceEfficiency>;

export const getAll = async (filters: EfficienciesFilters) => {
  const {data} = await httpClient.get<EfficienciesResponse>(`/efficiencies/`, {
    params: filters,
  });

  return data;
};

/* const filters = {
  rigId: "e3de80b0-619c-4743-9a5d-f59daeb592ec",
  startDate: "2023-08-03T03:00:00.000Z",
  endDate: "2023-08-08T12:21:11.942Z",
}; */
