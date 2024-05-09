import {useQuery} from "@tanstack/react-query";

import {QueryKeys} from "../config/QueryKeys";
import {systemVersionService} from "../services/systemVersionService";

/**
 * Hook for fetching the latest system version.
 * Retrieves the latest system version from the server and provides functions to access and manage the version data.
 * @returns An object containing the latest system version, loading state, and a function to refetch the version.
 * @example
 * // Example usage:
 * const { systemVersion, isLoading, refetchSystemVersion } = useSystemVersion();
 * useEffect(() => {
 *   refetchSystemVersion();
 * }, []);
 */
export const useSystemVersion = () => {
  const {data, isFetching, refetch} = useQuery({
    queryKey: [QueryKeys.SYSTEM_VERSION],
    queryFn: () => systemVersionService.getLast(),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    systemVersion: data ?? null,
    isSystemVersion: isFetching,
    refetchSystemVersion: refetch,
  };
};
