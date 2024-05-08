import {httpClient} from "../httpClient";

export interface userLogCreateParams {
  loginTime: string | Date;
}

export const create = async (params: userLogCreateParams) => {
  const response = await httpClient.post("/user-log", params);

  console.log(response);
  return response.data;
};
