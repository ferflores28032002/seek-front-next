"use client";

import { useState } from "react";

import BurnBarrel from "../BurnBarrel";
import TaskColumn from "../ColumnTasks";

import { CardType, ColumnType } from "../..";

interface BoardProps {
  tasks: CardType[];
  status: ColumnType[];
}
const Board = ({ tasks, status }: BoardProps) => {
  const [cards, setCards] = useState(tasks);

  return (
    <div className="flex h-full w-full gap-3  p-12">
      {status.map((column) => (
        <TaskColumn
          key={column.id}
          title={column.name}
          description={column.description}
          column={column.name}
          headingColor={column.headingColor}
          cards={cards}
          columnId={column.id}
          setCards={setCards}
        />
      ))}
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

export default Board;
