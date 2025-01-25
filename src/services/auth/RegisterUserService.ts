import api from "../axiosInstance";

export interface RegisterPayload {
  name:     string;
  email:    string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  user:  User;
}

export interface User {
  id:         number;
  email:      string;
  password:   string;
  name:       string;
  status:     boolean;
  isVerified: boolean;
  createdAt:  Date;
  updatedAt:  Date;
}

export const RegisterUserService = async (payload: RegisterPayload) => {
  const response = await api.post<RegisterResponse>("/users", payload);
  return response.data;
};