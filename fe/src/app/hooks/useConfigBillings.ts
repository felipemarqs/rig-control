import {useQuery} from "@tanstack/react-query";
import {billingConfigService} from "../services/billingConfigServices";

export const useConfigBillings = () => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["configBillings"],
    queryFn: () => billingConfigService.getAll(),
  });

  return {
    configs: data ?? [],
    isFetchingConfig: isFetching,
    refetchConfig: refetch,
  };
};
