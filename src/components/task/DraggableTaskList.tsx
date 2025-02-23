import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableTaskCard from "./SortableTaskCard";
import { Plus } from "lucide-react";
import { Task } from "../../utilities/TaskContext";

interface DraggableTaskListProps {
  title: string;
  tasks: Task[];
  onAddClick: () => void;
  onEditTask: (task: Task) => void;
}

export default function DraggableTaskList({
  title,
  tasks,
  onAddClick,
  onEditTask,
}: DraggableTaskListProps) {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex-1 min-w-[300px] bg-techiGreyShadeFour dark:bg-gray-800 rounded-lg p-4 snap-start"
    >
      <div className="flex justify-between items-center mb-[1.6rem]">
        <p className="text-[1.6rem] text-techiGreyShadeTwo dark:text-gray-300">
          {title}{" "}
          {tasks.length > 0 && (
            <span className="text-[1.6rem] p-[.6rem] bg-techiGreyShadeThree dark:bg-gray-700 rounded-[.4rem]">
              {tasks.length}
            </span>
          )}
        </p>
        <button
          onClick={onAddClick}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <Plus className="w-6 h-6 text-techiGreyShadeTwo dark:text-gray-300" />
        </button>
      </div>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} {...task} onEdit={onEditTask} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
