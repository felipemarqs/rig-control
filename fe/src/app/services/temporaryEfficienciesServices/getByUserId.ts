import {httpClient} from "../httpClient";
import {TemporaryEfficiencyResponse} from "./getById";

export const getByUserId = async (user: string) => {
  const {data} = await httpClient.get<TemporaryEfficiencyResponse>(
    `temporary-efficiencies/user/${user}`
  );

  return data;
};
