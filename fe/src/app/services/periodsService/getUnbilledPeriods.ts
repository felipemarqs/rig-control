import {Period} from "../../entities/Period";
import {httpClient} from "../httpClient";

export type GetUnbilledPeriodsFilters = {
  startDate: string;
  endDate: string;
};

export type GetUnbilledPeriodsResponse = Array<Period>;

export const getUnbilledPeriods = async (
  filters: GetUnbilledPeriodsFilters
) => {
  const {data} = await httpClient.get<GetUnbilledPeriodsResponse>(
    "/periods/unbilled",
    {
      params: filters,
    }
  );

  return data;
};
