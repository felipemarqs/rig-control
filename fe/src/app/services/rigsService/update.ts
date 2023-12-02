import {UF} from "../../entities/Rig";
import {httpClient} from "../httpClient";

export interface UpdateParams {
  id: string;
  name: string;
  isActive: boolean;
  state: UF;
}

export const update = async ({id, ...params}: UpdateParams) => {
  //await timeout(1500);
  const {data} = await httpClient.patch(`/rigs/${id}`, params);

  return data;
};
