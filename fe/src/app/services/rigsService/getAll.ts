import {Rig} from "../../entities/Rig";
import {httpClient} from "../httpClient";

export type RigsResponse = Array<Rig>;

export const getAll = async () => {
  const {data} = await httpClient.get<RigsResponse>(`/rigs/`);

  return data;
};
