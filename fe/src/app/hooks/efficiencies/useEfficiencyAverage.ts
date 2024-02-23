import {useQuery} from "@tanstack/react-query";
import {efficienciesService} from "../../services/efficienciesService";

export const useEfficiencyAverage = (rig: string) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["average"],
    enabled: false,
    queryFn: () => efficienciesService.getAverage(rig),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    average: data ?? [],
    isFetchingAverage: isFetching,
    refetchAverage: refetch,
  };
};
