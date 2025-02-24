import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableTaskCard from "./SortableTaskCard";
import { Plus } from "lucide-react";
import { Task, useTaskContext } from "../../utilities/TaskContext";
import { useState, useEffect } from "react";
import TaskSelectionModal from "./TaskSelectModal";

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
  const [isTaskSelectionModalOpen, setTaskSelectionModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { setNodeRef } = useDroppable({
    id: title,
  });
  const { tasks: allTasks, updateTask } = useTaskContext();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getAvailableTasks = () => {
    return allTasks.filter(
      (task) =>
        task.status !== title &&
        (title === "In Progress"
          ? task.status === "To-Do"
          : title === "Completed"
          ? task.status === "In Progress"
          : false)
    );
  };

  const handlePlusClick = () => {
    if (title === "To-Do") {
      onAddClick();
    } else {
      setTaskSelectionModalOpen(true);
    }
  };

  const handleTaskSelect = (task: Task) => {
    updateTask(task.id, { status: title });
    setTaskSelectionModalOpen(false);
  };

  return (
    <div
      ref={!isMobile ? setNodeRef : undefined}
      className="flex-1 min-w-[300px] bg-techiGreyShadeFour dark:bg-gray-800 rounded-lg p-4 snap-start"
    >
      <div className="flex justify-between items-center mb-[1.6rem]">
        <p className="text-[1.6rem] text-techiGreyShadeTwo dark:text-gray-300">
          {title}{" "}
          {tasks.length > 0 && (
            <span className="text-[1.6rem] px-[1rem] py-[.6rem] bg-techiGreyShadeThree dark:bg-gray-700 rounded-[.4rem]">
              {tasks.length}
            </span>
          )}
        </p>
        <button
          onClick={handlePlusClick}
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
            <SortableTaskCard
              key={task.id}
              {...task}
              onEdit={onEditTask}
              disabled={isMobile}
            />
          ))}
        </div>
      </SortableContext>

      <TaskSelectionModal
        isOpen={isTaskSelectionModalOpen}
        onClose={() => setTaskSelectionModalOpen(false)}
        availableTasks={getAvailableTasks()}
        onTaskSelect={handleTaskSelect}
        targetStatus={title}
      />
    </div>
  );
}
