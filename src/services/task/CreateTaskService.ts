import api from "../axiosInstance";

export type TaskPayload = {
  title: string;
  description: string;
  statusId: number;
};

export type TaskResponse = {
  id: number;
  title: string;
  description: string;
  statusId: number;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
};

/**
 * Service to create a new task.
 * 
 * This function sends a POST request to the "/task" endpoint with the provided payload
 * to create a new task. It is designed to be used within a React Query hook.
 * 
 * @param payload - The data required to create a new task.
 * @returns A promise that resolves to the response data containing the created task details.
 */
export const CreateTaskService = async (payload: TaskPayload): Promise<TaskResponse> => {
  const response = await api.post<TaskResponse>("/task", payload);
  return response.data;
};
