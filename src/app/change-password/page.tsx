"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components";

import { usePasswordChange } from "@/hooks/auth/usePasswordChange";

import { cn } from "@/lib/utils";
import { Icons } from "@/icons";

interface ChangePasswordFormInputs {
  password: string;
}

const PasswordChangePage: React.FC = () => {
  const mutation = usePasswordChange();
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormInputs>();

  const token = searchParams.get("token");

  if (!token) {
    router.push("/login");
    return null;
  }

  const onSubmit: SubmitHandler<ChangePasswordFormInputs> = async (data) => {
    await mutation.mutate({ newPassword: data.password, token });
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Ingresa tu nueva contraseña
          </h1>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1 py-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  {...register("password", {
                    required: "La contraseña es requerida",
                  })}
                  type="password"
                  className={cn({
                    "focus-visible:ring-red-500": errors.password,
                  })}
                  placeholder="Contraseña"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                isLoading={mutation.isPending}
                className="w-full"
              >
                {mutation.isPending
                  ? "Cambiando contraseña..."
                  : "Cambiar contraseña"}
              </Button>
            </div>
          </form>

          <div className="relative mb-36">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center "
            >
              <span className="w-full border-t" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <PasswordChangePage />
    </Suspense>
  );
}
