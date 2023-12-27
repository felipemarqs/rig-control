import {AccessLevel} from "../../entities/AccessLevel";
import {httpClient} from "../httpClient";

export interface UpdateParams {
  id: string;
  email: string;
  password: string;
  accessLevel: AccessLevel;
  name: string;
  rigId?: string;
  contractId?: string;
}

export const update = async ({id, ...params}: UpdateParams) => {
  //await timeout(1500);
  const {data} = await httpClient.put(`/users/${id}`, params);

  return data;
};
