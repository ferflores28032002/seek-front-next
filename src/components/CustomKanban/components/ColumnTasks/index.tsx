"use client";

import {
  Dispatch,
  DragEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { useEditTask } from "@/hooks/task/useEditTask";
import { AddTask, CardTask, DropIndicator } from "../";
import { CardType } from "../..";
import { Badge } from "@/components/ui/badge";

type ColumnProps = {
  title: string;
  headingColor: string;
  cards: CardType[];
  column: string;
  description: string;
  columnId: string;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const TaskColumn = (props: ColumnProps) => {
  const { title, headingColor, cards, column, columnId, setCards } = props;

  const mutate = useEditTask();

  const [active, setActive] = useState(false);

  useEffect(() => {
    clearHighlights();
  }, []);

  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");
    if (!cardId) return;

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    const before = element?.dataset.before || "-1";

    if (before !== cardId) {
      let updatedCards = cards.filter((c) => c.id !== cardId);
      const movedCard = cards.find((c) => c.id === cardId);

      if (!movedCard) return;

      if (before === "-1") {
        updatedCards.push({ ...movedCard, column });
      } else {
        const insertIndex = updatedCards.findIndex((c) => c.id === before);
        updatedCards.splice(insertIndex, 0, { ...movedCard, column });
      }

      setCards(updatedCards);
      mutate.mutate({
        id: parseInt(cardId),
        payload: {
          statusId: parseInt(columnId),
          description: movedCard.description,
          title: movedCard.title,
        },
      });
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();
    indicators.forEach((i) => (i.style.opacity = "0"));
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();
    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as NodeListOf<HTMLElement>
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };
  const filteredCards = cards.filter((c) => c.column === column);
  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <Badge className={`${headingColor} dark:bg-transparent px-2 py-1`}>
          {title}
        </Badge>
        <span className="rounded text-sm dark:text-neutral-400 text-black">
          {filteredCards.length}
        </span>
      </div>

      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors shadow-[0_8px_20px_rgba(0,0,0,0.05)] p-3 overflow-y-auto scrollbar-hide ${
          active
            ? "bg-white dark:bg-neutral-800/50"
            : "bg-white dark:bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => (
          <CardTask
            key={c.id}
            {...c}
            handleDragStart={handleDragStart}
            description={c.description}
          />
        ))}
        <DropIndicator beforeId={null} column={column} />
        <AddTask column={column} setCards={setCards} columnId={columnId} />
      </div>
    </div>
  );
};

export default TaskColumn;
