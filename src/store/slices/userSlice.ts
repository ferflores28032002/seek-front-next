import { StateCreator } from "zustand";
import { UserLoginModel, UserSlice } from "../interfaces/login-user.interface";

export const userSlice: StateCreator<UserSlice> = (set) => ({
  token: null,
  user: null,
  setUser: (token: string, user: UserLoginModel) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
});
