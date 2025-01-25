"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { useLogin } from "@/hooks/auth/useLogin";
import { Icons } from "@/icons";
import { ArrowRight } from "lucide-react";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Page = () => {
  const mutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    await mutation.mutate(data);
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Iniciar sesión en tu cuenta
          </h1>

          <Link
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
            href="/register"
          >
            Crear una cuenta
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1 py-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  {...register("email", {
                    required: "El correo electrónico es requerido",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                      message: "Formato de correo electrónico inválido",
                    },
                    validate: {
                      notDisposable: (value) =>
                        !/^(?=.*@(?:10minutemail\.com|guerrillamail\.com|mailinator\.com))/.test(
                          value
                        ) || "No se permiten correos electrónicos temporales",
                    },
                  })}
                  className={cn({
                    "focus-visible:ring-red-500": errors.email,
                  })}
                  placeholder="tucorreo@ejemplo.com"
                  type="email"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

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
                {mutation.isPending ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </div>
          </form>

          <div className="flex justify-center mt-2">
            <Link
              href="/password-recovery"
              className="text-sm text-blue-500 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

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

export default Page;
