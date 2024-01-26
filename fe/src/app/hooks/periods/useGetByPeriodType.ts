import {useQuery} from "@tanstack/react-query";
import {GetByPeriodTypeFilters} from "../../services/periodsService/getByPeriodType";
import {periodsService} from "../../services/periodsService";

export const useGetByPeriodType = (filters: GetByPeriodTypeFilters) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["periods"],
    queryFn: () => periodsService.getByPeriodType(filters),
  });

  return {
    periodsResponse: data ?? {data: [], totalItems: 0},
    isFetchingPeriods: isFetching,
    refetchPeriods: refetch,
  };
};
