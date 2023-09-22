import {useQuery} from "@tanstack/react-query";
import {efficienciesService} from "../services/efficienciesService";

export const useEfficiencyAverage = (rig: string) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["average"],
    queryFn: () => efficienciesService.getAverage(rig),
  });

  return {
    average: data ?? [],
    isFetchingAverage: isFetching,
    refetchAverage: refetch,
  };
};