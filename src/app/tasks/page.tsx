"use client";

import { useState } from "react";

import {
  Button,
  DataTable,
  FeatureMessage,
  Loading,
  MaxWidthWrapper,
} from "@/components/";

import TaskFormDialog from "@/components/UserFormDialog";

import { TaskFormInputs } from "@/components/UserFormDialog/components/UserFormFields";
import { useCreateTask } from "@/hooks/task/useCreateTask";
import { useListTaks } from "@/hooks/task/useListTask";
import Swal from "sweetalert2";
import { columns } from "../../components/shared/columns.users";

const Page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading } = useListTaks();
  const mutate = useCreateTask();

  const handleAddTaskSubmit = (formData: TaskFormInputs) => {
    mutate.mutate(formData);
    setIsDialogOpen(false);

    Swal.fire({
      title: "Tarea creada",
      text: "La tarea ha sido creada con éxito.",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#2563EB",
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <MaxWidthWrapper>
        <FeatureMessage
          subtitle="Listado de tareas"
          description="Aquí puedes ver la lista de tareas que tienes pendientes."
          title="Gestión de tareas "
        />
        <div className="mb-4 flex justify-end">
          <Button onClick={() => setIsDialogOpen(true)}>Agregar tarea</Button>
        </div>

        <DataTable columns={columns} data={data ? data : []} />

        <TaskFormDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleAddTaskSubmit}
          isEditing={false}
        />
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
