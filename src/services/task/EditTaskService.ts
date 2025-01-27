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
 * Updates a task with the given ID using the provided payload.
 * 
 * This service function sends a PUT request to the `/task/${id}` endpoint
 * with the task payload to update the task details. It is typically used
 * within a React Query hook to manage task updates in a React application.
 * 
 * @param id - The unique identifier of the task to be updated.
 * @param payload - The data to update the task with.
 * @returns A promise that resolves to the updated task response.
 */
export const EditTaskService = async (id: number, payload: TaskPayload): Promise<TaskResponse> => {
  const response = await api.put<TaskResponse>(`/task/${id}`, payload);
  return response.data;
};
