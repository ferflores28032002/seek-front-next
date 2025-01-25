import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

import { CreateTaskService, TaskPayload, TaskResponse } from "@/services/task/CreateTaskService";

export const useCreateTask = (): UseMutationResult<TaskResponse, Error, TaskPayload> => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateTaskService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: Error) => {
      console.error("Error creating task:", error.message);
    },
  });
};
