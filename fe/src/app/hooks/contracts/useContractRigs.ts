import {useQuery} from "@tanstack/react-query";
import {contractsService} from "../../services/contractsService";

export const useContractRigs = (contractId: string) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["contractRigs"],
    queryFn: () => contractsService.getRigs(contractId),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    contractRigs: data ?? [],
    isFetchingContractRigs: isFetching,
    refetchContractRigs: refetch,
  };
};
