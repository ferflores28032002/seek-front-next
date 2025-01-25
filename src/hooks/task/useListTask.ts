import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { ListTaskService, Task } from "@/services/task/ListTaskService";

export const useListTaks = (): UseQueryResult<Task[], Error> => {
  return useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: ListTaskService,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};
