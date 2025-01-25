import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

import { TaskPayload, TaskResponse } from "@/services/task/CreateTaskService";
import { EditTaskService } from "@/services/task/EditTaskService";

type EditTaskPayload = {
  id: number;
  payload: TaskPayload;
};

export const useEditTask = (): UseMutationResult<TaskResponse, Error, EditTaskPayload> => {

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => EditTaskService(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["tasks"]});
    },
    onError: (error: Error) => {
      console.error("Error editing task:", error.message);
    },
  });
};
