import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";

import { UserSlice } from "./interfaces/login-user.interface";
import { userSlice } from "./slices/userSlice";

type ShareState = UserSlice;

export const useAuthStore = create<ShareState>()(
  devtools(
    persist(
      (...a) => ({
        ...userSlice(...a),
      }),
      {
        name: "auth-storage",
        getStorage: () => localStorage,
      }
    )
  )
);
