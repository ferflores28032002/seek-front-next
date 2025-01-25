import api from "../axiosInstance";

export const DeleteTaskService = async (id: number): Promise<void> => {
  const response = await api.delete(`/task/${id}`);
  if (!response.status.toString().startsWith("2")) {
    throw new Error("Failed to delete task");
  }
};
