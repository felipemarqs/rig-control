import {httpClient} from "../httpClient";

export const getByUserId = async () => {
  const {data} = await httpClient.get("/user-log");
  return data;
};
