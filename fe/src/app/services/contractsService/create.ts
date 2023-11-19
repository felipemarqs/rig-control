import {httpClient} from "../httpClient";

interface ToPersistenceContract {
  name: string;
}

export const create = async (params: ToPersistenceContract) => {
  const {data} = await httpClient.post("/contracts", params);

  return data;
};
