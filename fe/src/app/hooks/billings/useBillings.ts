import {useQuery} from "@tanstack/react-query";

import {billingServices} from "../../services/billingServices";
import {BillingsFilters} from "../../services/billingServices/getAll";
import {QueryKeys} from "../../entities/QueryKeys";

export const useBillings = (filters: BillingsFilters) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: [QueryKeys.BILLINGS],
    queryFn: () => billingServices.getAll(filters),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    billings: data ?? [],
    isFetchingBillings: isFetching,
    refetchBillings: refetch,
  };
};
