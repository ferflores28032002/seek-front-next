"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForgotPassword } from "@/hooks/auth/useForgotPassword";

import { cn } from "@/lib/utils";
import { Icons } from "@/icons";

interface LoginFormInputs {
  email: string;
}

const Page = () => {
  const mutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Enviar correo de recuperación
          </h1>
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

              <Button
                type="submit"
                isLoading={mutation.isPending}
                className="w-full"
              >
                {mutation.isPending ? "Enviando correo..." : "Enviar correo"}
              </Button>
            </div>
          </form>

          <div className="relative mb-36">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
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
