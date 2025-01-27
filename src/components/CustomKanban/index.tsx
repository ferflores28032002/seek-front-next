"use client";

import { useListStatuses } from "@/hooks/statusTask/useListStatuses";
import { useListTaks } from "@/hooks/task/useListTask";
import { BarChart, CheckSquare } from "lucide-react";
import Link from "next/link";
import Loading from "../Loading";
import { buttonVariants } from "../ui/button";
import Board from "./components/Board";
import { useRedirectIfUnauthenticated } from "@/app/useRedirectIfUnauthenticated";

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
  const isCheckingAuth = useRedirectIfUnauthenticated();

  const isLoading = isLoadingStatuses || isLoadingTasks || isCheckingAuth;

  const mappedColumns: ColumnType[] =
    statuses?.map((status) => ({
      name: status.name,
      id: status.id.toString(),
      headingColor: status.color,
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
      <div className="flex items-center justify-between container mt-4">
        <h1 className="text-xl font-semibold dark:text-white text-gray-800">
          Organiza tus Tareas con Kanban
        </h1>
        <div className="flex gap-4">
          <Link href="/reports" className={buttonVariants()}>
            <BarChart className="h-5 w-5 text-white" />
          </Link>
          <Link href="/tasks" className={buttonVariants()}>
            <CheckSquare className="h-5 w-5 text-white" />
          </Link>
        </div>
      </div>

      {!isLoading && <Board tasks={mappedCards} status={mappedColumns} />}
    </div>
  );
};
