import {useQuery} from "@tanstack/react-query";
import {efficienciesService} from "../../services/efficienciesService";
import {filters} from "../../services/efficienciesService/getRigsAverage";

export const useEfficienciesRigsAverage = (
  filters: filters,
  enabled: boolean = false
) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["rigsAverage"],
    enabled: enabled,
    queryFn: () => efficienciesService.getRigsAverage(filters),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    rigsAverage: data ?? [],
    isFetchingRigsAverage: isFetching,
    refetchRigsAverage: refetch,
  };
};
