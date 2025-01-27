import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import DescriptionTextarea from "@/components/DescriptionTextarea";

import NameInput from "@/components/NameInput";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useListStatuses } from "@/hooks/statusTask/useListStatuses";

export type TaskFormInputs = {
  title: string;
  description: string;
  statusId: number;
};

interface TaskFormFieldsProps {
  initialValues?: Partial<TaskFormInputs>;
}

export const TaskFormFields: React.FC<TaskFormFieldsProps> = ({
  initialValues,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<TaskFormInputs>();

  const { data, isLoading, isError } = useListStatuses();

  useEffect(() => {
    register("statusId", { required: "El estatus es obligatorio" });
  }, []);

  return (
    <>
      <div className="mb-6">
        <NameInput
          name="title"
          register={register}
          error={errors.title?.message}
        />
      </div>

      <div className="mb-6">
        <DescriptionTextarea
          name="description"
          register={register}
          error={errors.description?.message}
        />
      </div>

      <div className="mb-6">
        {isLoading && <p>Cargando estatus...</p>}
        {isError && <p>Error al cargar los estatus.</p>}
        {!isLoading && !isError && (
          <>
            <Select
              onValueChange={(value: string) =>
                setValue("statusId", Number(value), {
                  shouldValidate: true,
                })
              }
              defaultValue={initialValues?.statusId?.toString() || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar Estatus" />
              </SelectTrigger>
              <SelectContent>
                {data?.map((status) => (
                  <SelectItem key={status.id} value={status.id.toString()}>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.statusId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.statusId.message}
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};
