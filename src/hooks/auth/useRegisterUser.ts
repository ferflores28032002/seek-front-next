import {
  RegisterPayload,
  RegisterResponse,
  RegisterUserService,
} from "@/services/auth/RegisterUserService";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

type UseRegister = () => UseMutationResult<
  RegisterResponse,
  Error,
  RegisterPayload
>;

export const useRegisterUser: UseRegister = () => {
  const router = useRouter();

  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: RegisterUserService,
    onSuccess: (data: RegisterResponse) => {
      router.push("/user-verification");
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });
};
