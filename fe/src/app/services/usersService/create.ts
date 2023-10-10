import {AccessLevel} from "../../entities/AccessLevel";
import {httpClient} from "../httpClient";

export interface CreateParams {
  email: string;
  password: string;
  accessLevel: AccessLevel;
  name: string;
  rigId?: string;
  contractId?: string;
}

interface CreateResponse {
  accessToken: string;
}

export const create = async (params: CreateParams) => {
  const {data} = await httpClient.post<CreateResponse>("/auth/signup", params);
  return data;
};
