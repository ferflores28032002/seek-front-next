import api from "../axiosInstance";

export type Status = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  color: string;
};

/**
 * Fetches the list of status from the API.
 *
 * This service function makes a GET request to the "/status" endpoint
 * and returns the response data, which is an array of `Status` objects.
 *
 * @returns {Promise<Status[]>} A promise that resolves to an array of `Status` objects.
 *
 * @example
 * // Usage in a React component with React Query
 * import { useQuery } from 'react-query';
 * import { ListStatusService } from 'path/to/ListStatusService';
 *
 * const { data, error, isLoading } = useQuery('statusList', ListStatusService);
 */
export const ListStatusService = async (): Promise<Status[]> => {
  const response = await api.get<Status[]>("/status");
  return response.data;
};
