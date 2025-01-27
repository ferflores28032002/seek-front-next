import api from "../axiosInstance";
import { Status } from "../StatusTask/ListStatusService";

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

/**
 * Fetches a list of tasks from the API.
 *
 * This service function makes an HTTP GET request to the "/task" endpoint
 * to retrieve an array of tasks. It is designed to be used in conjunction
 * with React Query hooks for efficient data fetching and caching in a React
 * application.
 *
 * @returns {Promise<Task[]>} A promise that resolves to an array of Task objects.
 */
export const ListTaskService = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>("/task");
  return response.data;
};
