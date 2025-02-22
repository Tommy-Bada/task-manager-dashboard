import { useEffect, useRef, useState } from "react";
import Badges, { BadgeProps } from "../badge/badges";
import { cheveron } from "../../assets/icons";

interface PrioritySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function PrioritySelect({
  value,
  onValueChange,
}: PrioritySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const priorities: BadgeProps["priority"][] = ["low", "medium", "high"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-[100%] mt-[.6rem]" ref={selectRef}>
      <button
        className="w-full p-[1.2rem] text-left bg-white border rounded-lg flex items-center justify-between hover:border-gray-400 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? (
          <Badges priority={value as BadgeProps["priority"]} />
        ) : (
          <span className="text-techiGrey text-[1.4rem]">
            Select the priority of the task
          </span>
        )}
        <img
          src={cheveron}
          alt=""
          width={24}
          height={24}
          className={`w-4 h-4 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute w-[50%] mt-1 right-0 bg-white border rounded-lg shadow-lg z-10">
          {priorities.map((priority) => (
            <div
              key={priority}
              className="cursor-pointer hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              onClick={() => {
                onValueChange(priority);
                setIsOpen(false);
              }}
            >
              <Badges priority={priority} width />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
