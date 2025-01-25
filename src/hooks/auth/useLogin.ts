import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { useAuthStore } from "@/store";

import { useRouter } from "next/navigation";

import Swal from "sweetalert2";
import {
  LoginPayload,
  LoginResponse,
  LoginService,
} from "../../services/auth/LoginService";

type UseLogin = () => UseMutationResult<LoginResponse, Error, LoginPayload>;

export const useLogin: UseLogin = () => {
  const router = useRouter();
  
  const { setUser } = useAuthStore((state) => ({
    setUser: state.setUser,
  }));

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: LoginService,
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem("authToken", data.token);
    
      setUser(data.token, {
        email: data.user.email,
        id: data.user.id,
        name: data.user.name,
      });
      router.push("/tasks");
    },
    onError: (error: Error) => {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "Usuario o contraseña incorrectos",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3085d6",
      });
    },
  });
};
