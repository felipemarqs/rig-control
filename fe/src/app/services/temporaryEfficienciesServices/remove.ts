import {httpClient} from "../httpClient";

export const remove = async (efficiencyId: string) => {
  const {data} = await httpClient.delete(
    `/temporary-efficiencies/${efficiencyId}`
  );

  return data;
};
