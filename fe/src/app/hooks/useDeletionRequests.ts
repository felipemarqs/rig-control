import {useQuery} from "@tanstack/react-query";
import {deletionRequestsServices} from "../services/deletionRequestsServices";

export const useDeletionRequests = () => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: ["deletion-requests"],
    queryFn: () => deletionRequestsServices.getAll(),
  });

  return {
    rigs: data ?? [],
    isFetchingDeletionsRequests: isFetching,
    refetchDeletionsRequests: refetch,
  };
};
