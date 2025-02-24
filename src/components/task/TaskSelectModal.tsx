import { X } from "lucide-react";
import { Task } from "../../utilities/TaskContext";

interface TaskSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableTasks: Task[];
  onTaskSelect: (task: Task) => void;
  targetStatus: string;
}

export default function TaskSelectionModal({
  isOpen,
  onClose,
  availableTasks,
  onTaskSelect,
  targetStatus,
}: TaskSelectionModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="relative bg-white dark:bg-gray-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6 dark:border-gray-700">
            <h2 className="text-[2.4rem] font-semibold text-black dark:text-white">
              Add Task to {targetStatus}
            </h2>
            <X
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            />
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {availableTasks.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4 text-[1.4rem]">
                No tasks available to add
              </p>
            ) : (
              <div className="space-y-4">
                {availableTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => onTaskSelect(task)}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <h3 className="font-medium text-[1.4rem] text-techiBlack dark:text-white">
                      {task.title}
                    </h3>
                    <p className="text-[1.2rem] text-gray-500 dark:text-gray-400">
                      Current Status: {task.status}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
