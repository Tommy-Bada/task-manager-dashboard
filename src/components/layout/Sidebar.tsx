import { ListTodo, ClipboardList, Timer, CheckCircle, X } from "lucide-react";
import { useTheme } from "../../utilities/DarkLightModeProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { logo } from "../../assets/icons";

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();
  const { isDarkMode } = useTheme();

  const navItems = [
    {
      name: "ALL TASKS",
      Icon: ListTodo,
      route: "/",
      isActive: location.pathname === "/",
    },
    {
      name: "TO DO",
      Icon: ClipboardList,
      route: "/to-do",
      isActive: location.pathname === "/to-do",
    },
    {
      name: "IN PROGRESS",
      Icon: Timer,
      route: "/in-progress",
      isActive: location.pathname === "/in-progress",
    },
    {
      name: "COMPLETED",
      Icon: CheckCircle,
      route: "/completed",
      isActive: location.pathname === "/completed",
    },
  ];
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white dark:bg-gray-900 h-full flex flex-col">
      <div className="w-[100%] flex justify-end">
        <X
          onClick={onClose}
          className="md:hidden p-4  text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
          color={isDarkMode ? "#ffffff" : "#000000"}
          size={50}
        />
      </div>

      <div className="p-4 md:p-[4rem]">
        {isDarkMode ? (
          <p
            className="text-white text-[4rem] italic"
            style={{ fontFamily: "cursive" }}
          >
            Techinover
          </p>
        ) : (
          <img
            src={logo}
            alt="techinover logo"
            className="w-full h-auto max-w-[200px] max-sm:mb-[1rem] sm:mx-auto md:mx-0"
          />
        )}
      </div>

      <nav className="flex-1">
        {navItems.map(({ name, Icon, isActive, route }) => (
          <div
            key={name}
            className={`${
              isActive
                ? "bg-techiPurpleLight dark:bg-gray-800 border-r-[.7rem] border-r-techiPurple "
                : ""
            } p-4 md:p-[2rem] cursor-pointer flex items-center gap-x-[2rem] hover:bg-gray-100 dark:hover:bg-gray-800 mb-[2rem]`}
            onClick={() => {
              if (onClose) onClose();
              navigate(route);
            }}
          >
            <div className="w-[2rem] md:w-[4rem]">
              <Icon
                className={`w-full h-auto
                ${
                  isActive
                    ? "text-techiPurple"
                    : "text-techiGrey dark:text-gray-300"
                }
              `}
              />
            </div>
            <p
              className={`text-[1.6rem] md:text-[1.8rem]  font-[500] !font-['SF_Pro_Display'] ${
                isActive
                  ? "text-techiPurple"
                  : "text-techiGrey dark:text-gray-300"
              }`}
            >
              {name}
            </p>
          </div>
        ))}
      </nav>
    </div>
  );
}
