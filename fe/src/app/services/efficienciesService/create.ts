import {PersistanceEfficiency} from "../../entities/PersistanceEfficiency";
import {httpClient} from "../httpClient";

export const create = async (params: PersistanceEfficiency) => {
  const {data} = await httpClient.post("/efficiencies", params);

  return data;
};
