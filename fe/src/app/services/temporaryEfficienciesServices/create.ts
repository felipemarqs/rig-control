import {ToPersistanceEfficiency} from "../../entities/PersistanceEfficiency";
import {httpClient} from "../httpClient";

export const create = async (params: ToPersistanceEfficiency) => {
  const {data} = await httpClient.post("/efficiencies", params);

  return data;
};
