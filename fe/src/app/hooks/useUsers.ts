import {useQuery} from "@tanstack/react-query";

import {usersFilters} from "../services/usersService/getAll";
import {usersService} from "../services/usersService";

export const useUsers = (filters: usersFilters) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["users"],
    queryFn: () => usersService.getAll(filters),
  });

  return {
    users: data ?? [],
    isFetchingUsers: isFetching,
    refetchUsers: refetch,
  };
};
