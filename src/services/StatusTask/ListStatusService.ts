import api from "../axiosInstance";

export type Status = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  color: string;
};

export const ListStatusService = async (): Promise<Status[]> => {
  const response = await api.get<Status[]>("/status");
  return response.data;
};
