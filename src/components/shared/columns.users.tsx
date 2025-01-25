import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import Swal from "sweetalert2";

import { Button } from "@/components";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDeleteTask } from "@/hooks/task/useDeleteTask";
import { Task } from "@/services/task/ListTaskService";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import TaskFormDialog from "../UserFormDialog";
import { TaskFormInputs } from "../UserFormDialog/components/UserFormFields";
import { useEditTask } from "@/hooks/task/useEditTask";

const UserActionsCell = ({ row }: any) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const deleteTask = useDeleteTask();
  const updateTask = useEditTask();

  const handleEditSubmit = (formData: TaskFormInputs) => {
    const payload = {
      ...formData,
      id: row.original.id,
    };

    updateTask.mutate({ id: row.original.id, payload });

    Swal.fire({
      title: "¡Actualizado!",
      text: "Tu tarea ha sido actualizada.",
      icon: "success",
      confirmButtonColor: "#2563EB",
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, ¡elimínalo!",
      cancelButtonText: "No, ¡cancelar!",
      confirmButtonColor: "red",
      cancelButtonColor: "#2563EB",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask.mutate(row.original.id);
        Swal.fire({
          title: "¡Eliminado!",
          text: "Tu tarea ha sido eliminada.",
          icon: "success",
          confirmButtonColor: "#2563EB",
        });
      }
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">
              Opciones de la tarea {row.original.title}
            </span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>Eliminar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TaskFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleEditSubmit}
        initialValues={{
          title: row.original.title,
          description: row.original.description,
          statusId: row.original.status.id,
        }}
        isEditing={true}
      />
    </>
  );
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => (
      <div
        className="truncate max-w-[200px]"
        title={row.getValue("description")}
      >
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "status.name",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status?.name || "N/A";
      return <Badge variant="default">{status}</Badge>;
    },
  },
  {
    accessorKey: "creator.name",
    header: "Creador",
    cell: ({ row }) => {
      const creator = row.original.creator?.name || "N/A";
      return <div className="capitalize">{creator}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de Creación",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Última Actualización",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("updatedAt")).toLocaleDateString()}</div>
    ),
  },
  {
    id: "Opciones",
    enableHiding: false,
    cell: ({ row }) => <UserActionsCell row={row} />,
  },
];
