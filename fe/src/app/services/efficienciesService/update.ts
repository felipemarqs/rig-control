import {httpClient} from "../httpClient";

export interface UpdateParams {
  efficiencyId: string;
  isEditable: boolean;
}

export const update = async ({efficiencyId, ...params}: UpdateParams) => {
  const {data} = await httpClient.patch(
    `/efficiencies/${efficiencyId}`,
    params
  );

  return data;
};
