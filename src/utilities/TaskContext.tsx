import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  visual?: string;
  date: string;
  time: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Error reading tasks from localStorage:", error);
      return [];
    }
  });

  const addTask = (task: Task) => {
    setTasks((prev) => {
      const updatedTasks = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks((prev) => {
      const updatedTasks = prev.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const deleteTask = (id: string) => {
    toast.success("Task deleted successfully");
    setTasks((prev) => {
      const updatedTasks = prev.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within TaskProvider");
  return context;
};
