import {useQuery} from "@tanstack/react-query";
import {GetByPeriodTypeFilters} from "../../services/periodsService/getByPeriodType";
import {periodsService} from "../../services/periodsService";

export const useGetByPeriodType = (filters: GetByPeriodTypeFilters) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["periods"],
    queryFn: () => periodsService.getByPeriodType(filters),
  });

  return {
    periods: data ?? [],
    isFetchingPeriods: isFetching,
    refetchPeriods: refetch,
  };
};
