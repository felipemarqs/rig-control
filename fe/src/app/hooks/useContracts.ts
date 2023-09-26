import {useQuery} from "@tanstack/react-query";
import {contractsService} from "../services/contractsService";

export const useContracts = (isUserAdm?: boolean) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["contracts"],
    queryFn: () => contractsService.getAll(),
    enabled: isUserAdm,
  });

  return {
    contracts: data ?? [],
    isFetchingContracts: isFetching,
    refetchContracts: refetch,
  };
};
