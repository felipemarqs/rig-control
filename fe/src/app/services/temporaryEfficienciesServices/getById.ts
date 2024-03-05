import { PersistanceEfficiency } from "../../entities/PersistanceEfficiency";
import { httpClient } from "../httpClient";

export type EfficienciesFilters = {
  rigId: string;
  startDate: string;
  endDate: string;
};

export type EfficienciesResponse = PersistanceEfficiency;

export const getById = async (efficiencyId: string) => {
  const { data } = await httpClient.get<EfficienciesResponse>(
    `/efficiencies/${efficiencyId}`
  );

  return data;
};
