import { useState } from "react";
import { completedFlag, dueFlag, menuBtn, newFlag } from "../../assets/icons";
import Badges from "../badge/badges";
interface TaskProps {
  priority: "low" | "medium" | "high";
  title: string;
  visual?: string;
  description?: string;
  status: "completed" | "inProgress" | "toDo";
  flag: "new" | "overdue" | "done";
  date: string;
  time: string;
}
export default function TaskCard({
  priority,
  title,
  visual,
  description,
  flag,
  date,
  time,
}: TaskProps) {
  const [popUp, setPopup] = useState<boolean>(false);
  return (
    <div
      className="p-[1.6rem] bg-white rounded-[.6rem] w-[30%] relative"
      onClick={() => setPopup(false)}
    >
      <Badges priority={priority} />
      <div className="mt-[1.6rem] flex justify-between items-center">
        <p className=" text-techiBlack text-[1.6rem] ">{title}</p>
        <img
          src={menuBtn}
          alt=""
          height={24}
          width={24}
          onClick={(e) => {
            e.stopPropagation();
            setPopup(!popUp);
          }}
          className="cursor-pointer"
        />
      </div>
      {popUp && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-white w-[6rem] absolute z-50 right-0 rounded-[.6rem] px-[1.2rem] py-[.8rem] flex flex-col gap-y-[.8rem] border mr-[1.6rem] mt-[.8rem]"
        >
          <p className="text-[1.2rem] cursor-pointer text-techiBlackShadeOne">
            Edit
          </p>
          <p className="text-[1.2rem] cursor-pointer text-techiRed">Delete</p>
        </div>
      )}
      <div className="w-[100%] mt-[.8rem]">
        <img
          src={visual}
          alt={title}
          width="100%"
          height="auto"
          className="rounded-[.6rem]"
        />
      </div>
      <p className="text-[1.4rem] mt-[.8rem] mb-[1.6rem] text-techiBlackShadeOne">
        {description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-[1.2rem]">
          {flag === "new" && (
            <img src={newFlag} alt="flag" width="24" height="24" />
          )}
          {flag === "overdue" && (
            <img src={dueFlag} alt="flag" width="24" height="24" />
          )}
          {flag === "done" && (
            <img src={completedFlag} alt="flag" width="24" height="24" />
          )}
          <p className="text-techiGreyShadeOne text-[1.2rem]">{date}</p>
        </div>
        <p className="text-techiGreyShadeTwo text-[1.2rem]">{time}</p>
      </div>
    </div>
  );
}
