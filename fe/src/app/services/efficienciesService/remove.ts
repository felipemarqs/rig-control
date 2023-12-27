import {httpClient} from "../httpClient";

export const remove = async (efficiencyId: string) => {
  const {data} = await httpClient.delete(`/efficiencies/${efficiencyId}`);

  return data;
};
