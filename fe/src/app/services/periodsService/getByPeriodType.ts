import {OrderByType} from "../../entities/OrderBy";
import {Period} from "../../entities/Period";
import {PeriodType} from "../../entities/PeriodType";
import {RepairClassification} from "../../entities/RepairClassification";
import {httpClient} from "../httpClient";

export type GetByPeriodTypeFilters = {
  rigId: string;
  periodType: PeriodType;
  periodClassification: string;
  repairClassification: null | RepairClassification;
  orderBy: OrderByType;
  startDate: string;
  endDate: string;
  pageSize: string;
  pageIndex: string;
};

export type GetByPeriodIdResponse = {data: Array<Period>; totalItems: number};

export const getByPeriodType = async (filters: GetByPeriodTypeFilters) => {
  const {data} = await httpClient.get<GetByPeriodIdResponse>("/periods", {
    params: filters,
  });

  return data;
};
