import { LayoutGrid, X } from "lucide-react";
import {
  inboxIcon,
  logo,
  noteIcon,
  settingsIcon,
  todoListIcon,
} from "../../assets/icons";
import { useTheme } from "../../utilities/DarkLightModeProvider";
import { useLocation } from "react-router-dom";
export default function Sidebar({ onClose }: { onClose: () => void }) {
  const location = useLocation();
  const navitems = [
    {
      name: "CALENDAR",
      icon: "",
      route: "/",
      isActive: location.pathname === "/",
    },
    {
      name: "INBOX",
      icon: inboxIcon,
      route: "/inbox",
      isActive: location.pathname === "/inbox",
    },
    {
      name: "NOTES",
      icon: noteIcon,
      route: "/notes",
      isActive: location.pathname === "/notes",
    },
    {
      name: "TO DO LIST",
      icon: todoListIcon,
      route: "/to-do-list",
      isActive: location.pathname === "/to-do-list",
    },
    {
      name: "SETTINGS",
      icon: settingsIcon,
      route: "/settings",
      isActive: location.pathname === "/settings",
    },
  ];
  const { isDarkMode } = useTheme();
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
            className="w-full h-auto max-w-[200px] mx-auto md:mx-0"
          />
        )}
      </div>
      <nav className="flex-1">
        {navitems.map((item) => (
          <div
            key={item.name}
            className={`${
              item.isActive
                ? "bg-techiPurpleLight dark:bg-gray-800 border-r-[.7rem] border-r-techiPurple "
                : ""
            } p-4 md:p-[2rem] cursor-pointer flex items-center gap-x-[2rem] hover:bg-gray-100 dark:hover:bg-gray-800`}
            onClick={() => {
              if (onClose) onClose();
            }}
          >
            <div className="w-8 md:w-[3.6rem]">
              {item.name === "CALENDAR" ? (
                <LayoutGrid
                  color={item.isActive ? "#4F35F3" : "#65676D"}
                  className="w-full h-auto"
                />
              ) : (
                <img src={item.icon} alt="" className="w-full h-auto" />
              )}
            </div>
            <p
              className={`text-[1.6rem] md:text-[1.8rem]  font-[400]  ${
                item.isActive
                  ? "text-techiPurple"
                  : "text-techiGrey dark:text-gray-300"
              }`}
            >
              {item.name}
            </p>
          </div>
        ))}
      </nav>
    </div>
  );
}
