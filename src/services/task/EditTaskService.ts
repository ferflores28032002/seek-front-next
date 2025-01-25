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

export const EditTaskService = async (id: number, payload: TaskPayload): Promise<TaskResponse> => {
  const response = await api.put<TaskResponse>(`/task/${id}`, payload);
  return response.data;
};
