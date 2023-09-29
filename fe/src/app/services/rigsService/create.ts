import {RigDetails} from "../../entities/RigDetails";
import {httpClient} from "../httpClient";

export const create = async (params: RigDetails) => {
  const {data} = await httpClient.post("/rigs", params);

  return data;
};
