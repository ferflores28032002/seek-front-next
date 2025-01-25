import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import { DeleteTaskService } from "@/services/task/DeleteTaskService";

export const useDeleteTask = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteTaskService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (error: Error) => {
      console.error("Error deleting task:", error.message);
    },
  });
};
