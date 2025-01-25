"use client";

import Link from "next/link";

import { MaxWidthWrapper, buttonVariants } from "@/components";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Gestiona tus tareas fácilmente&nbsp;
          <span className="text-blue-600" id="cypress-title-home">
            con seek
          </span>
        </h1>
        <p
          className="mt-6 text-lg max-w-prose text-muted-foreground"
          id="cypress-description-home"
        >
          ¡Descubre cómo organizar y supervisar tus pendientes nunca fue tan
          fácil! Con Seek, puedes visualizar tus tareas, actualizarlas en
          diferentes estados y mantener todo bajo control. Una app diseñada para
          ayudarte a priorizar, completar tus objetivos y simplificar tu vida,
          sin complicaciones.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/register" className={buttonVariants()}>
            Registrate &rarr;
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
