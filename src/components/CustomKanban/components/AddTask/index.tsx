import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DescriptionTextarea from "@/components/DescriptionTextarea";
import NameInput from "@/components/NameInput";
import AddKanbanTaskButton from "../AddKanbanTaskButton";

import { useCreateTask } from "@/hooks/task/useCreateTask";
import { CardType } from "../..";


type AddCardProps = {
  column: string;
  columnId: string;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

type FormData = {
  title: string;
  description: string;
};

const AddTask = ({ column, columnId, setCards }: AddCardProps) => {
  const { mutate, error } = useCreateTask();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const newCard: CardType = {
      column,
      title: data.title.trim(),
      id: Math.random().toString(),
      description: data.description.trim(),
    };
    mutate(
      {
        title: data.title,
        description: data.description,
        statusId: parseInt(columnId),
      },
      {
        onSuccess: () => {
          setCards((prev) => [...prev, newCard]);
          reset();
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddKanbanTaskButton onClick={() => setOpen(true)} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Agregar Tarea a la columna{" "}
            <span className="font-semibold">{column}</span> <br />
            {error?.response?.data?.message && (
              <span className="mt-2 text-sm text-red-500 font-medium">
                {error.response.data.message}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <NameInput
            name="title"
            register={register}
            error={errors.title?.message}
          />
          <DescriptionTextarea
            name="description"
            register={register}
            error={errors.description?.message}
          />
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                reset();
                setOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">Crear Tarea</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
