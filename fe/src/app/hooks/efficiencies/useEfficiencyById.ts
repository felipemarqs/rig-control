import {useQuery} from "@tanstack/react-query";
import {efficienciesService} from "../../services/efficienciesService";
import {QueryKeys} from "../../config/QueryKeys";

export const useEfficiencyById = (efficiencyId: string) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: [QueryKeys.EFFICIENCY],
    queryFn: () => efficienciesService.getById(efficiencyId),
  });

  console.log("Efficiency Data", data);

  return {
    efficiency: data ?? null,
    isFetchingEfficiency: isFetching,
    refetchEffciency: refetch,
  };
};
