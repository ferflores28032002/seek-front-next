"use client";

import Link from "next/link";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { buttonVariants, Loading } from "@/components";

import NoTasksMessage from "@/components/NoTasksMessage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useListTaks } from "@/hooks/task/useListTask";

import { COLORS } from "@/constants/colors";
import { CheckSquare, LayoutGrid } from "lucide-react";
import { useRedirectIfUnauthenticated } from "../../hooks/shared/useRedirectIfUnauthenticated";

const TaskPieChart: React.FC = () => {
  const { data: tasks, isLoading } = useListTaks();
  const isCheckingAuth = useRedirectIfUnauthenticated();

  if (isLoading || isCheckingAuth) {
    return <Loading />;
  }

  if (!tasks || tasks.length === 0) {
    return <NoTasksMessage />;
  }

  const taskCounts = tasks.reduce((acc: Record<string, number>, task) => {
    const statusName = task?.status?.name || "Sin estado";
    acc[statusName] = (acc[statusName] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(taskCounts).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <Card className="rounded-lg ">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-md sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
            Distribución de Tareas por Estado
          </CardTitle>
          <div className="flex gap-2">
            <Link
              href="/kanban"
              className={`${buttonVariants()} hidden sm:flex`}
            >
              <LayoutGrid className="h-[1.2rem] w-[1rem] text-white" />
            </Link>
            <Link href="/tasks" className={buttonVariants()}>
              <CheckSquare className="h-[1.2rem] w-[1rem] text-white" />
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#333", color: "#fff" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskPieChart;
