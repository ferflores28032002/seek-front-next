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

export const CreateTaskService = async (payload: TaskPayload): Promise<TaskResponse> => {
  const response = await api.post<TaskResponse>("/task", payload);
  return response.data;
};
