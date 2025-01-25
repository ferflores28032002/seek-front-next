"use client";

import { useListStatuses } from "@/hooks/statusTask/useListStatuses";
import { useListTaks } from "@/hooks/task/useListTask";
import Loading from "../Loading";
import Board from "./components/Board";

export interface ColumnType {
  name: string;
  id: string;
  headingColor: string;
  description: string;
}

export interface CardType {
  title: string;
  id: string;
  column: string;
  description: string;
}

export const CustomKanban = () => {
  const { data: statuses, isLoading: isLoadingStatuses } = useListStatuses();
  const { data: tasks, isLoading: isLoadingTasks } = useListTaks();

  const isLoading = isLoadingStatuses || isLoadingTasks;

  const mappedColumns: ColumnType[] =
    statuses?.map((status) => ({
      name: status.name,
      id: status.id.toString(),
      headingColor: "text-blue-500",
      description: status.description,
    })) || [];

  const mappedCards: CardType[] =
    tasks?.map((task) => ({
      title: task.title,
      id: task.id.toString(),
      column: task.status.name,
      description: task.description,
    })) || [];

  return (
    <div className="h-screen w-full dark:bg-gray-950 bg-white text-neutral-50">
      {isLoading && <Loading />}

      {!isLoading && <Board tasks={mappedCards} status={mappedColumns} />}
    </div>
  );
};
