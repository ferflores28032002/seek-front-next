import api from "../axiosInstance";

export interface LoginPayload {
  email:    string;
  password: string;
}

export interface LoginResponse {
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
  roleId:     number;
  createdAt:  Date;
  updatedAt:  Date;
}

export const LoginService = async (credentials: LoginPayload) => {
  const response = await api.post<LoginResponse>("/users/login", credentials);
  return response.data;
};
