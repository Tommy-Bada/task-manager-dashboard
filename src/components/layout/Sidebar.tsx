import {
  calendarIcon,
  inboxIcon,
  logo,
  noteIcon,
  settingsIcon,
  todoListIcon,
} from "../../assets/icons";

const navitems = [
  { name: "CALENDAR", activeIcon: "", icon: calendarIcon, route: "/calendar" },
  { name: "INBOX", activeIcon: "", icon: inboxIcon, route: "/inbox" },
  { name: "NOTES", activeIcon: "", icon: noteIcon, route: "/notes" },
  {
    name: "TO DO LIST",
    activeIcon: "",
    icon: todoListIcon,
    route: "/to-do-list",
  },
  { name: "SETTINGS", activeIcon: "", icon: settingsIcon, route: "/settings" },
];
export default function Sidebar() {
  return (
    <div>
      <div className="w-[17rem] p-[4rem]">
        <img src={logo} alt="techinover logo" width="100%" height="auto" />
      </div>
      <nav>
        {navitems.map((item) => (
          <div className="p-[2rem] cursor-pointer flex items-center gap-x-[2rem]">
            <div className="w-[3.6rem]">
              <img src={item.icon} alt="" width="100%" height="auto" />
            </div>
            <p className="sec text-[1.8rem] text-techiGrey font-[400]">
              {item.name}
            </p>
          </div>
        ))}
      </nav>
    </div>
  );
}
