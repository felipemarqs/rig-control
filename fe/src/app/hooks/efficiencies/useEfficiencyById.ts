import {useQuery} from "@tanstack/react-query";
import {efficienciesService} from "../../services/efficienciesService";

export const useEfficiencyById = (efficiencyId: string) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["efficiency"],
    queryFn: () => efficienciesService.getById(efficiencyId),
  });

  return {
    efficiency: data ?? [],
    isFetchingEfficiency: isFetching,
    refetchEffciency: refetch,
  };
};
