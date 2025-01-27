"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Button,
  buttonVariants,
  DataTable,
  FeatureMessage,
  Loading,
  MaxWidthWrapper,
} from "@/components/";

import TaskFormDialog from "@/components/TaskFormDialog";
import { TaskFormInputs } from "@/components/TaskFormDialog/components/TaskFormFields";

import { useCreateTask } from "@/hooks/task/useCreateTask";
import { useListTaks } from "@/hooks/task/useListTask";

import { TasksColumn } from "@/helpers/Task/TaksColumn";
import { ApiError } from "@/services/auth/LoginService";
import { BarChart, LayoutGrid } from "lucide-react";
import { useRedirectIfUnauthenticated } from "../../hooks/shared/useRedirectIfUnauthenticated";

const Page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isCheckingAuth = useRedirectIfUnauthenticated();

  const { data, isLoading } = useListTaks();
  const mutate = useCreateTask();

  const handleAddTaskSubmit = (formData: TaskFormInputs) => {
    mutate.mutate(formData, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setErrorMessage(null);
      },
      onError: (error: ApiError) => {
        setErrorMessage(error.response?.data?.message || "Ocurrió un error");
      },
    });
  };

  if (isLoading || isCheckingAuth) {
    return <Loading />;
  }

  return (
    <div>
      <MaxWidthWrapper>
        <FeatureMessage
          subtitle="Organiza a Tu Manera"
          description="Organiza tus pendientes como prefieras: Kanban, tabla o gráficos. Visualiza y analiza el progreso de tus tareas de forma sencilla."
          title="Con Seek, todo es posible."
        />
        <div className="mb-4 flex gap-1 justify-center md:justify-end">
          <Link href="/kanban" className={`${buttonVariants()} hidden sm:flex`}>
            <LayoutGrid className="h-[1.2rem] w-[1rem] text-white" />
          </Link>
          <Link href="/reports" className={buttonVariants()}>
            <BarChart className="h-[1.2rem] w-[1rem] text-white" />
          </Link>
          <Button
            onClick={() => setIsDialogOpen(true)}
            variant="default"
            className="dark:text-white"
          >
            Agregar Tarea
          </Button>
        </div>

        <DataTable columns={TasksColumn} data={data ? data : []} />

        <TaskFormDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleAddTaskSubmit}
          isEditing={false}
          errorMessage={errorMessage}
        />
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
