import {httpClient} from "../httpClient";

export interface CreateParams {
  userId: string;
  rigs: string[];
}

export const updateRigs = async (params: CreateParams) => {
  const {data} = await httpClient.post("/users-rig/create-many", params);
  return data;
};
