import {useQuery} from "@tanstack/react-query";
import {QueryKeys} from "../../config/QueryKeys";
import {temporaryEfficienciesServices} from "../../services/temporaryEfficienciesServices";

export const useTemporaryEfficiencyByUserId = (userId: string) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: [QueryKeys.TEMPORARY_EFFICIENCY],
    queryFn: () => temporaryEfficienciesServices.getByUserId(userId),
  });

  return {
    temporaryEfficiency: data ?? [],
    isFetchingTemporaryEfficiencies: isFetching,
    refechTemporaryEfficiencies: refetch,
  };
};
