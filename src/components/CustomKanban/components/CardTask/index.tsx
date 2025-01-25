import { motion } from "framer-motion";

import DropIndicator from "../DropIndicator";

import { CardType } from "../..";

type CardProps = CardType & {
  handleDragStart: Function;
};

const CardTask = (props: CardProps) => {
  const { title, id, column, description, handleDragStart } = props;
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={`card-${id}`}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded dark:border  dark:border-neutral-700  bg-gray-50 dark:bg-neutral-500/20 p-3  shadow-[0_8px_20px_rgba(0,0,0,0.08)] active:cursor-grabbing transition-shadow duration-300"
      >
        <p className="text-sm dark:text-neutral-100 text-black truncate">
          {title}
        </p>

        <p className="mt-1 text-xs text-neutral-500 truncate dark:text-neutral-400">
          {description}
        </p>
      </motion.div>
    </>
  );
};

export default CardTask;
