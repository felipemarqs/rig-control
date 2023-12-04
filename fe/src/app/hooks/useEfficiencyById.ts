import {useQuery} from "@tanstack/react-query";
import {efficienciesService} from "../services/efficienciesService";

export const useEfficiencyById = (efficiencyId: string) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["efficiency"],
    queryFn: () => efficienciesService.getById(efficiencyId),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    efficiency: data ?? [],
    isFetchingEfficiency: isFetching,
    refetchEffciency: refetch,
  };
};
