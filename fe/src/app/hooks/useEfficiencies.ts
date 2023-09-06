import {useQuery} from "@tanstack/react-query";
import {efficienciesService} from "../services/efficienciesService";

import {EfficienciesFilters} from "../services/efficienciesService/getAll";

export const useEfficiencies = (filters: EfficienciesFilters) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["efficiencies"],
    queryFn: () => efficienciesService.getAll(filters),
  });

  return {
    efficiencies: data ?? [],
    isFetchingEfficiencies: isFetching,
    refetchEffciencies: refetch,
  };
};
