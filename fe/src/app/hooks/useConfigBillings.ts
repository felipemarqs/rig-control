import {useQuery} from "@tanstack/react-query";
import {billingConfigService} from "../services/billingConfigServices";

export const useConfigBillings = (isUserAdm?: boolean) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["configBillings"],
    queryFn: () => billingConfigService.getAll(),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: isUserAdm,
  });

  return {
    configs: data ?? [],
    isFetchingConfig: isFetching,
    refetchConfig: refetch,
  };
};
