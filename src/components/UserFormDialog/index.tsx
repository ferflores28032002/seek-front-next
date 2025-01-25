import React, { useEffect } from "react";

import { SubmitHandler, useForm, FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { TaskFormFields, TaskFormInputs } from "./components/UserFormFields";

interface TaskFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: SubmitHandler<TaskFormInputs>;
  initialValues?: Partial<TaskFormInputs>;
  isEditing?: boolean;
}

const TaskFormDialog: React.FC<TaskFormDialogProps> = (props) => {
  const {
    isOpen,
    onOpenChange,
    onSubmit,
    initialValues,
    isEditing = false,
  } = props;
  const methods = useForm<TaskFormInputs>();

  useEffect(() => {
    if (initialValues) {
      methods.reset(initialValues);
    }
  }, [initialValues, methods]);

  const handleFormSubmit: SubmitHandler<TaskFormInputs> = (data) => {
    onSubmit(data);
    methods.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Tarea" : "Agregar Nueva Tarea"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
            <TaskFormFields initialValues={initialValues} />
            <DialogFooter>
              <Button variant="destructive" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {isEditing ? "Actualizar Tarea" : "Agregar Tarea"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
