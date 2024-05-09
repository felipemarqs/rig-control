import {httpClient} from "../httpClient";

export const getAll = async () => {
  const {data} = await httpClient.get("/user-log");
  return data;
};
