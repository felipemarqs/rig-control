import {httpClient} from "../httpClient";

export type RigsAverageResponse = {
  rigId: string;
  rig: string;
  avg: number;
}[];

export type filters = {
  startDate: string;
  endDate: string;
};

export const getRigsAverage = async (filters: filters) => {
  const {data} = await httpClient.get<RigsAverageResponse>(
    "/efficiencies/average/",
    {
      params: filters,
    }
  );

  return data;
};
