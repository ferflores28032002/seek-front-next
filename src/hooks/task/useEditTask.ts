import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

import { TaskPayload, TaskResponse } from "@/services/task/CreateTaskService";
import { EditTaskService } from "@/services/task/EditTaskService";
import { ApiError } from "@/services/auth/LoginService";

type EditTaskPayload = {
  id: number;
  payload: TaskPayload;
};

export const useEditTask = (): UseMutationResult<TaskResponse, ApiError, EditTaskPayload> => {

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => EditTaskService(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["tasks"]});
    },
    onError: (error: ApiError) => {
      console.error("Error editing task:", error.message);
    },
  });
};
