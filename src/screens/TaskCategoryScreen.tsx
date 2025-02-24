// TaskCategoryScreen.tsx
import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { searchIcon } from "../assets/icons";
import { useTheme } from "../utilities/DarkLightModeProvider";
import { MoonIcon, SunIcon } from "lucide-react";
import TaskForm from "../components/task/TaskForm";
import { useTaskContext } from "../utilities/TaskContext";
import TaskCard from "../components/task/TaskCard";
import { Task } from "../utilities/TaskContext";

interface TaskCategoryScreenProps {
  title: string;
  status: "To-Do" | "In Progress" | "Completed" | null;
}

export default function TaskCategoryScreen({
  title,
  status,
}: TaskCategoryScreenProps) {
  const [searchValue, setSearchValue] = useState("");
  const { isDarkMode, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { tasks } = useTaskContext();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filteredTasks = tasks.filter(
    (task) =>
      (status === null || task.status === status) &&
      (!searchValue ||
        task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        task?.description?.toLowerCase().includes(searchValue.toLowerCase()))
  );

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

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
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>
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
          <div className="flex items-center gap-x-4 mb-4 lg:mb-0">
            <h1 className="text-[2rem] md:text-[3rem] text-black dark:text-white !font-['SF_Pro_Display'] font-[500]">
              {title}
            </h1>
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
                className="text-techiBlack dark:text-white text-[1.4rem] w-full outline-none bg-transparent ml-2"
              />
            </div>
          </div>
        </div>
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-gray-500 dark:text-gray-400 text-[1.6rem] italic  mb-4 ">
              {searchValue !== ""
                ? `No task called ${searchValue} found`
                : `No ${status} Task`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-techiGreyShadeFour dark:bg-gray-800 p-[2rem]">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                onEdit={() => handleEditTask(task)}
              />
            ))}
          </div>
        )}
      </div>
      <TaskForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Update Task"
        initialTask={selectedTask}
      />
    </div>
  );
}
