import { ColumnDef } from "@tanstack/react-table";

import TaskRowActions from "@/components/TaskRowActions";
import { Badge } from "@/components/ui/badge";

import { Task } from "@/services/task/ListTaskService";

export const TasksColumn: ColumnDef<Task>[] = [
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
      return (
        <Badge className={`${row?.original?.status?.color} dark:bg-transparent px-2 py-1`}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "creator.name",
    header: "Creador",
    cell: ({ row }) => {
      const creator = row.original.creator?.name || "N/A";
      return (
        <div className="truncate max-w-[150px]" title={creator}>
          {creator}
        </div>
      );
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
    id: "Opciones",
    enableHiding: false,
    cell: ({ row }) => <TaskRowActions row={row} />,
  },
];
