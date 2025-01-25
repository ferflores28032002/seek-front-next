import api from "../axiosInstance";

interface VerifyEmailResponse {
  message: string;
}
export interface VerifyEmailPayload {
  token: string;
}
export const UserVerificationService = async (payload: VerifyEmailPayload): Promise<VerifyEmailResponse> => {
  const response = await api.post<VerifyEmailResponse>(`/users/verify/${payload.token}`
  );
  return response.data;
};
