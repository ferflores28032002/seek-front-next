"use client";

import Image from "next/image";
import Link from "next/link";

import { Loader2, XCircle } from "lucide-react";

import { buttonVariants } from "../ui/button";
import { useVerifyEmail } from "@/hooks/auth/useVerifyEmail";
import { useEffect } from "react";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { mutate, isError, isPending, isSuccess } = useVerifyEmail();

  useEffect(() => {
    mutate({ token });
  }, [token]);

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2 mb-12">
        <XCircle className="h-8 w-8 text-red-600" />
        <h3 className="font-semibold text-xl">Hubo un problema</h3>
        <p className="text-muted-foreground text-sm">
          Este token no es válido o podría estar vencido. Inténtalo de nuevo.
        </p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex h-full flex-col items-center justify-center mb-12">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src="/hippo-email-sent.png" fill alt="the email was sent" />
        </div>

        <h3 className="font-semibold text-2xl">
          Correo electrónico verificado
        </h3>
        <p className="text-muted-foreground text-center mt-1">
          Gracias por verificar su correo electrónico.
        </p>
        <Link className={buttonVariants({ className: "mt-4" })} href="/login">
          Iniciar sesión
        </Link>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex flex-col items-center gap-2 mb-12">
        <Loader2 className="animate-spin h-8 w-8 text-zinc-300" />
        <h3 className="font-semibold text-xl">
          Verificando tu correo electrónico....
        </h3>
        <p className="text-muted-foreground text-sm">
          Por favor, espera un momento.
        </p>
      </div>
    );
  }
};

export default VerifyEmail;
