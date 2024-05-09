import {httpClient} from "../httpClient";

export interface userLogCreateParams {
  loginTime: string | Date;
}

export const create = async (params: userLogCreateParams) => {
  const {data} = await httpClient.post("/user-log", params);

  return data;
};
