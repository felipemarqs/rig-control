import {useQuery} from "@tanstack/react-query";

import {usersFilters} from "../../services/usersService/getAll";
import {usersService} from "../../services/usersService";
import {QueryKeys} from "../../config/QueryKeys";

export const useUsers = (filters: usersFilters, isUserAdm?: boolean) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: [QueryKeys.USERS],
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
