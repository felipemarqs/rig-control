import {httpClient} from "../httpClient";

export type SystemVersion = {
  id: string;
  version: string;
  createdAt: string;
};

/**
 * Retrieves the latest system version from the server.
 * @returns A promise that resolves to the latest system version data.
 */
export const getLast = async () => {
  const {data} = await httpClient.get<SystemVersion>("/system-version/latest");

  return data;
};
