import {Rig} from "../../entities/Rig";

import {httpClient} from "../httpClient";

export type ContractsResponse = Array<Rig>;

export const getRigs = async (contractId: string) => {
  const {data} = await httpClient.get<ContractsResponse>(
    `/contracts/get-rigs/${contractId}`
  );

  return data;
};
