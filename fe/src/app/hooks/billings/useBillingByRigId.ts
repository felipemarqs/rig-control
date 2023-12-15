import {useQuery} from "@tanstack/react-query";

import {billingServices} from "../../services/billingServices";
import {BillingsByRigIFilters} from "../../services/billingServices/getbyRigId";

export const useBillingByRigId = (filters: BillingsByRigIFilters) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["billing"],
    queryFn: () => billingServices.getbyRigId(filters),
  });

  console.log(data);

  return {
    billing: data ?? [],
    isFetchingBilling: isFetching,
    refetchBilling: refetch,
  };
};
