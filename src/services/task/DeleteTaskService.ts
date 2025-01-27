import api from "../axiosInstance";

/**
 * Deletes a task by its ID.
 *
 * This service function sends a DELETE request to the API to remove a task
 * identified by the provided ID. It is designed to be used in a React Query hook.
 *
 * @param {number} id - The ID of the task to be deleted.
 * @returns {Promise<void>} A promise that resolves when the task is successfully deleted.
 * @throws {Error} If the task deletion fails (i.e., the response status code does not start with "2").
 */
export const DeleteTaskService = async (id: number): Promise<void> => {
  const response = await api.delete(`/task/${id}`);
  if (!response.status.toString().startsWith("2")) {
    throw new Error("Failed to delete task");
  }
};
