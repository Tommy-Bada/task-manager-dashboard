import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { searchIcon } from "../assets/icons";
import TaskCard from "../components/task/TaskCard";
import { useTheme } from "../utilities/DarkLightModeProvider";
import { MoonIcon, SunIcon } from "lucide-react";
import TaskForm from "../components/task/TaskForm";
import { useTaskContext } from "../utilities/TaskContext";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Task } from "../utilities/TaskContext";
import DraggableTaskList from "../components/task/DraggableTaskList";

const TASK_STATUS = ["To-Do", "In Progress", "Completed"] as const;

export default function CalendarScreen() {
  const [searchValue, setSearchValue] = useState("");
  const { isDarkMode, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { tasks, updateTask } = useTaskContext();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (TASK_STATUS.includes(overId as (typeof TASK_STATUS)[number])) {
      const task = tasks.find((t) => t.id === activeId);
      if (task && task.status !== overId) {
        updateTask(task.id, { status: overId as string });
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (TASK_STATUS.includes(overId as (typeof TASK_STATUS)[number])) {
      const task = tasks.find((t) => t.id === activeId);
      if (task) {
        updateTask(task.id, { status: overId as string });
      }
    }
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(
      (task) =>
        task.status === status &&
        (!searchValue ||
          task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          task?.description?.toLowerCase().includes(searchValue.toLowerCase()))
    );
  };
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };
  console.log(selectedTask);
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-gray-900 relative">
      <div className="md:hidden p-4 flex justify-between items-center bg-white dark:bg-gray-900 border-b dark:border-gray-700">
        <div
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="text-black dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded w-[5rem]"
        >
          <div className="bg-techiBlack dark:bg-white w-[2.5rem] h-[.2rem]"></div>
          <div className="bg-techiBlack dark:bg-white w-[2.5rem] h-[.2rem] my-[.5rem]"></div>
          <div className="bg-techiBlack dark:bg-white w-[2.5rem] h-[.2rem]"></div>
        </div>
        <div className="flex items-center gap-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
      <div
        className={`
          fixed md:relative top-0 left-0 h-full w-[80%] md:w-[30%] lg:w-[20%]
          transform transition-transform duration-300 ease-in-out z-50
          md:translate-x-0 bg-white dark:bg-gray-900
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="w-full md:w-[70%] lg:w-[80%] px-4 md:px-[3.2rem] pt-[2rem] md:pt-[4rem]">
        <div className="flex flex-col lg:flex-row justify-between items-start w-full mb-[2rem] md:mb-[3.2rem]">
          <div className="flex items-center gap-x-[1.6rem] mb-4 lg:mb-0">
            <p className="text-[2rem] md:text-[3rem] text-black dark:text-white">
              {new Date().toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            {/* <div className="flex items-center gap-x-[1rem]">
              <CircleArrowLeft
                color={isDarkMode ? "#ffffff" : "#000000"}
                className="cursor-pointer"
              />
              <CircleArrowRight
                color={isDarkMode ? "#ffffff" : "#000000"}
                className="cursor-pointer"
              />
            </div> */}
          </div>
          <div className="flex items-center gap-x-4 w-full md:w-auto">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hidden sm:block"
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <div className="flex items-center border-[0.2rem] py-[1rem] px-[1.4rem] rounded-[.8rem] w-full sm:min-w-[30rem] bg-white dark:bg-gray-800">
              <img src={searchIcon} alt="search icon" className="w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                name="searchValue"
                className="text-techiBlack dark:text-white text-[1.4rem] w-full outline-none bg-transparent ml-2"
              />
            </div>
          </div>
        </div>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-[2rem] md:justify-between flex-nowrap overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {TASK_STATUS.map((status) => (
              <DraggableTaskList
                key={status}
                title={status}
                tasks={getTasksByStatus(status)}
                onAddClick={() => setIsModalOpen(true)}
                onEditTask={handleEditTask}
              />
            ))}
          </div>
          <DragOverlay>
            {activeTask && (
              <TaskCard
                id={activeTask.id}
                priority={activeTask.priority}
                title={activeTask.title}
                visual={activeTask.visual}
                description={activeTask.description}
                date={activeTask.date}
                time={activeTask.time}
                status={activeTask.status}
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
      <TaskForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedTask ? "Edit Task" : "Add Task"}
        initialTask={selectedTask}
      />
    </div>
  );
}
