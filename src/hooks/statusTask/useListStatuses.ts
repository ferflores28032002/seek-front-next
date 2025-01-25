import { useQuery, UseQueryResult } from "@tanstack/react-query";

import {
  ListStatusService,
  Status,
} from "@/services/StatusTask/ListStatusService";

export const useListStatuses = (): UseQueryResult<Status[], Error> => {
  return useQuery<Status[], Error>({
    queryKey: ["statuses"],
    queryFn: ListStatusService,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};
