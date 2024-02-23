import {useQuery} from "@tanstack/react-query";
import {contractsService} from "../../services/contractsService";
import {QueryKeys} from "../../entities/QueryKeys";

export const useContractRigs = (contractId: string) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: [QueryKeys.CONTRACT_RIGS],
    queryFn: () => contractsService.getRigs(contractId),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    contractRigs: data ?? [],
    isFetchingContractRigs: isFetching,
    refetchContractRigs: refetch,
  };
};
