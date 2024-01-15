import {useQuery} from "@tanstack/react-query";
import {rigsService} from "../../services/rigsService";

export const useRigs = (isUserAdm: boolean) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["rigs"],
    queryFn: () => rigsService.getAll(),
    enabled: isUserAdm,
    staleTime: 1000,
  });

  return {
    rigs: data ?? [],
    isFetchingRigs: isFetching,
    refetchRigs: refetch,
  };
};
