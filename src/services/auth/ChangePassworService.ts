import api from "../axiosInstance";

export interface ChangePasswordPayload {
  token: string;
  newPassword: string;
}

export const ChangePasswordService = async (credentials: ChangePasswordPayload ) => {
  const response = await api.post<string>("/users/update-password", credentials);
  return response.data;
};
