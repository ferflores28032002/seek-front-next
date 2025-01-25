"use client";

import Link from "next/link";

import { MaxWidthWrapper, buttonVariants } from "@/components";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Tu solución para la gestión &nbsp;
          <span className="text-blue-600" id="cypress-title-home">
            eficiente de tareas
          </span>
        </h1>
        <p
          className="mt-6 text-lg max-w-prose text-muted-foreground"
          id="cypress-description-home"
        >
          ¡Tu herramienta todo-en-uno para organizar, priorizar y gestionar tus
          tareas! Nuestra plataforma te ayuda a mantener el control de tus
          proyectos, optimizar tu tiempo y alcanzar tus metas de manera
          eficiente. Conéctate, colabora y supervisa tus progresos en tiempo
          real, todo desde un solo lugar. ¡Di adiós al caos y hola a la
          productividad!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/login" className={buttonVariants()}>
            Registrate &rarr;
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
