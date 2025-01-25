import { Dispatch, DragEvent, SetStateAction, useState } from "react";

import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

import { useDeleteTask } from "@/hooks/task/useDeleteTask";
import { CardType } from "../..";

interface BurnBarrelProps {
  setCards: Dispatch<SetStateAction<CardType[]>>;
}

const BurnBarrel = ({ setCards }: BurnBarrelProps) => {
  const [active, setActive] = useState(false);
  const mutate = useDeleteTask();

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDrop = async (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");
    if (!cardId) return;

    setCards((prev) => prev.filter((c) => c.id !== cardId));

    mutate.mutate(parseInt(cardId));

    setActive(false);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded text-3xl transition-all ${
        active
          ? "bg-red-800/20 text-red-500 shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
          : "bg-gray-50 shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:bg-neutral-500/20 border-0 dark:border dark:border-neutral-500 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

export default BurnBarrel;
