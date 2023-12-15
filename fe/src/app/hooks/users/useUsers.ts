import {useQuery} from "@tanstack/react-query";

import {usersFilters} from "../../services/usersService/getAll";
import {usersService} from "../../services/usersService";

export const useUsers = (filters: usersFilters, isUserAdm?: boolean) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["users"],
    queryFn: () => usersService.getAll(filters),
    enabled: isUserAdm,
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    users: data ?? [],
    isFetchingUsers: isFetching,
    refetchUsers: refetch,
  };
};
