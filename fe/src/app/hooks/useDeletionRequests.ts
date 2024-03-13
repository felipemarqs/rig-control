import {useQuery} from "@tanstack/react-query";
import {deletionRequestsServices} from "../services/deletionRequestsServices";
import {deletionRequestFilters} from "../services/deletionRequestsServices/getAll";
import {QueryKeys} from "../config/QueryKeys";

export const useDeletionRequests = (filters: deletionRequestFilters) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: [QueryKeys.DELETION_REQUESTS],
    queryFn: () => deletionRequestsServices.getAll(filters),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    deletionRequests: data ?? [],
    isFetchingDeletionsRequests: isFetching,
    refetchDeletionsRequests: refetch,
  };
};
