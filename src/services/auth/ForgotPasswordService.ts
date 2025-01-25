import api from "../axiosInstance";

export interface EmailPayload {
  email: string;
}

export const ForgotPasswordService = async (email: EmailPayload) => {
  const response = await api.post<string>("/users/forgot-password", email);
  return response.data;
};
