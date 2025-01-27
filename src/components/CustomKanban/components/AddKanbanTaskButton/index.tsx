import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

type AddKanbanTaskButtonProps = {
  onClick?: () => void;
};

const AddKanbanTaskButton = ({ onClick }: AddKanbanTaskButtonProps) => {
  return (
    <motion.button
      layout
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      className="flex w-full items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md shadow-md transition-all duration-300
bg-blue-500 text-white hover:bg-indigo-600 dark:text-gray-100 dark:hover:bg-indigo-600
hover:scale-105 active:scale-95"
    >
      <FiPlus className="text-lg" />
      <span>Agregar Tarea</span>
    </motion.button>
  );
};

export default AddKanbanTaskButton;
