import {useQuery} from "@tanstack/react-query";
import {deletionRequestsServices} from "../services/deletionRequestsServices";
import {deletionRequestFilters} from "../services/deletionRequestsServices/getAll";

export const useDeletionRequests = (filters: deletionRequestFilters) => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["deletion-requests"],
    queryFn: () => deletionRequestsServices.getAll(filters),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    deletionRequests: data ?? [],
    isFetchingDeletionsRequests: isFetching,
    refetchDeletionsRequests: refetch,
  };
};
