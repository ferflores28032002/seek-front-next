import { Dispatch, FormEvent, SetStateAction, useState } from "react";

import { CardType } from "../..";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useCreateTask } from "@/hooks/task/useCreateTask";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

type AddCardProps = {
  column: string;
  columnId: string;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const AddTask = (props: AddCardProps) => {
  const { column, columnId, setCards } = props;

  const mutate = useCreateTask();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: column,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title.trim().length) return;

    const newCard: CardType = {
      column,
      title: formData.title.trim(),
      id: Math.random().toString(),
      description: formData.description.trim(),
    };

    setCards((prev) => [...prev, newCard]);

    mutate.mutate({
      title: formData.title,
      description: formData.description,
      statusId: parseInt(columnId),
    });

    setFormData({ title: "", description: "", status: column });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.button
          layout
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add Task</span>
          <FiPlus />
        </motion.button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-neutral-50">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task title"
              className="w-full rounded border border-neutral-500 bg-neutral-800 p-2 text-neutral-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-neutral-50">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Task description"
              className="w-full rounded border border-neutral-500 bg-neutral-800 p-2 text-neutral-50"
            />
          </div>
          <DialogFooter>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-3 py-2 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-violet-500 px-3 py-2 text-xs text-neutral-50 transition-colors hover:bg-violet-600"
            >
              Add Task
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
