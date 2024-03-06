import {useQuery} from "@tanstack/react-query";
import {QueryKeys} from "../../config/QueryKeys";
import {temporaryEfficienciesServices} from "../../services/temporaryEfficienciesServices";

export const useTemporaryEfficiencyById = (efficiencyId: string) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: [QueryKeys.TEMPORARY_EFFICIENCIE],
    queryFn: () => temporaryEfficienciesServices.getById(efficiencyId),
  });

  return {
    temporaryEfficiency: data ?? [],
    isFetchingTemporaryEfficiency: isFetching,
    refechTemporaryEfficiency: refetch,
  };
};
