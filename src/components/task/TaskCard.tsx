import { useState } from "react";
import { completedFlag, dueFlag, newFlag } from "../../assets/icons";
import Badges from "../badge/badges";
import { RectangleEllipsis } from "lucide-react";
import { useTheme } from "../../utilities/DarkLightModeProvider";
import { useTaskContext } from "../../utilities/TaskContext";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

interface TaskProps {
  id: string;
  priority: string;
  title: string;
  visual?: string;
  description?: string;
  status: string;
  date: string;
  time: string;
  onEdit?: (task: TaskProps) => void;
}

export default function TaskCard({
  priority,
  title,
  visual,
  description,
  date,
  time,
  id,
  status,
  onEdit,
}: TaskProps) {
  const [popUp, setPopup] = useState<boolean>(false);
  const { isDarkMode } = useTheme();
  const { deleteTask } = useTaskContext();
  const handleEdit = () => {
    if (onEdit) {
      onEdit({ id, priority, title, visual, description, status, date, time });
      setPopup(false);
    }
  };
  return (
    <div
      className="p-[1.6rem] bg-white dark:bg-gray-700 rounded-[.6rem] w-[100%] relative mb-[1.6rem] shadow-sm"
      onClick={() => setPopup(false)}
    >
      <Badges priority={priority} />
      <div className="mt-[1.6rem] flex justify-between items-center">
        <p className="text-techiBlack dark:text-white font-[500] text-[1.6rem] !font-['SF_Pro_Display']">
          {title}
        </p>
        <RectangleEllipsis
          color={isDarkMode ? "#ffffff" : "#6f6f6f"}
          onClick={(e) => {
            e.stopPropagation();
            setPopup(!popUp);
          }}
          className="cursor-pointer"
        />
      </div>
      {popUp && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-700 w-[6rem] absolute z-50 right-0 rounded-[.6rem] px-[1.2rem] py-[.8rem] flex flex-col gap-y-[.8rem] border dark:border-gray-600 mr-[1.6rem] mt-[.8rem]"
        >
          <p
            className="text-[1.2rem] cursor-pointer text-techiBlackShadeOne dark:text-gray-200"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="text-[1.2rem] cursor-pointer text-techiRed"
            onClick={() => deleteTask(id)}
          >
            Delete
          </p>
        </div>
      )}

      {visual && (
        <div className="w-full mt-[.8rem]">
          <img
            src={visual}
            alt={title}
            className="w-full h-auto rounded-[.6rem]"
          />
        </div>
      )}

      <p className="text-[1.4rem] mt-[.8rem] mb-[1.6rem] text-techiBlackShadeOne dark:text-gray-300 font-[400]  w-[100%] ">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-[1.2rem]">
          {(status === "To-Do" || status === "In Progress") &&
            (() => {
              const now = new Date();
              const [taskHours, taskMinutes] = time.split(":").map(Number);
              const taskDateTime = new Date(date);
              taskDateTime.setHours(taskHours, taskMinutes);

              return now > taskDateTime ? (
                <img src={dueFlag} alt="Overdue flag" className="w-6 h-6" />
              ) : (
                <img src={newFlag} alt="New flag" className="w-6 h-6" />
              );
            })()}

          {status === "Completed" && (
            <img src={completedFlag} alt="Completed flag" className="w-6 h-6" />
          )}
          <p className="text-techiGreyShadeOne dark:text-gray-400 text-[1.2rem]">
            {dayjs(date).format("MMM Do YYYY")}
          </p>
        </div>
        <p className="text-techiGreyShadeTwo dark:text-gray-500 text-[1.2rem]">
          {dayjs(`2000-01-01 ${time}`).format("h:mma").toLowerCase()}
        </p>
      </div>
    </div>
  );
}
