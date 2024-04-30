import {useQuery} from "@tanstack/react-query";
import {periodsService} from "../../services/periodsService";
import {QueryKeys} from "../../config/QueryKeys";
import {GetUnbilledPeriodsFilters} from "../../services/periodsService/getUnbilledPeriods";

export const useGetUnbilledPeriods = (
  filters: GetUnbilledPeriodsFilters,
  enabled: boolean = false
) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: [QueryKeys.UNBILLED_PERIODS],
    queryFn: () => periodsService.getUnbilledPeriods(filters),
    enabled: enabled,
  });

  return {
    unbilledPeriods: data ?? [],
    isFetchingUnbilledPeriods: isFetching,
    refetchUnbilledPeriods: refetch,
  };
};
