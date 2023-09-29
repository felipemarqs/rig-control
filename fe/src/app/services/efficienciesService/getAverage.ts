import {httpClient} from "../httpClient";

export type AverageResponse = Array<{month: string; avg: number}>;

export const getAverage = async (rigId: string) => {
  const {data} = await httpClient.get<AverageResponse>(
    `/efficiencies/average/${rigId}`
  );

  return data;
};
