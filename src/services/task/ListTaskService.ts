import api from "../axiosInstance";

export type Status = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  color: string;
};

export type Creator = {
  id: number;
  email: string;
  password: string;
  name: string;
  status: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  statusId: number;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  status: Status;
  creator: Creator;
};

export const ListTaskService = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>("/task");
  return response.data;
};
