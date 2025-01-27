import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

import { ApiError } from "@/services/auth/LoginService";
import { CreateTaskService, TaskPayload, TaskResponse } from "@/services/task/CreateTaskService";

export const useCreateTask = (): UseMutationResult<TaskResponse, ApiError, TaskPayload> => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateTaskService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: ApiError) => {
      console.error("Error creating task:", error.message);
    },
  });
};
