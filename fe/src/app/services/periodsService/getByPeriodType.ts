import {Period} from "../../entities/Period";
import {httpClient} from "../httpClient";

export type GetByPeriodTypeFilters = {
  rigId: string;
  periodType: string;
  orderBy: string;
};

export type GetByPeriodIdResponse = Array<Period>;

export const getByPeriodType = async (filters: GetByPeriodTypeFilters) => {
  const {data} = await httpClient.get<GetByPeriodIdResponse>("/periods", {
    params: filters,
  });

  return data;
};
