import React from "react";

import { useFormContext } from "react-hook-form";

import { useListStatuses } from "@/hooks/statusTask/useListStatuses";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export type TaskFormInputs = {
  title: string;
  description: string;
  statusId: number;
};

interface TaskFormFieldsProps {
  initialValues?: Partial<TaskFormInputs>;
}

export const TaskFormFields: React.FC<TaskFormFieldsProps> = ({ initialValues }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<TaskFormInputs>();

  const { data, isLoading, isError } = useListStatuses();

  return (
    <>
      <div className="mb-6">
        <Input
          title="Título"
          placeholder="Ingresa el título de la tarea"
          {...register("title", { required: "El título es obligatorio" })}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-6">
        <Textarea 
          title="Descripción"
          placeholder="Ingresa la descripción de la tarea"
          {...register("description", {
            required: "La descripción es obligatoria",
          })}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        {isLoading && <p>Cargando estatus...</p>}
        {isError && <p>Error al cargar los estatus.</p>}
        {!isLoading && !isError && (
          <Select
            onValueChange={(value: any) => setValue("statusId", Number(value))}
            defaultValue={initialValues?.statusId?.toString()}
          >
            <SelectTrigger>Seleccionar Estatus</SelectTrigger>
            <SelectContent>
              {data?.map((status) => (
                <SelectItem key={status.id} value={status.id.toString()}>
                  {status.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </>
  );
};
