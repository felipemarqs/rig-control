import {User} from "../../entities/User";
import {httpClient} from "../httpClient";

export interface usersFilters {
  contractId?: string;
}

export const getAll = async (filters: usersFilters) => {
  const {data} = await httpClient.get<Array<User>>(`/users/`, {
    params: filters,
  });

  return data;
};

/* const filters = {
  rigId: "e3de80b0-619c-4743-9a5d-f59daeb592ec",
  startDate: "2023-08-03T03:00:00.000Z",
  endDate: "2023-08-08T12:21:11.942Z",
}; */
