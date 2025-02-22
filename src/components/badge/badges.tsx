import clsx from "clsx";
export interface BadgeProps {
  priority: "low" | "medium" | "high";
  width?: boolean;
}
export default function Badges({ priority, width }: BadgeProps) {
  return (
    <div
      className={clsx(
        width
          ? "w-full px-[1.2rem] py-[.8rem] "
          : "w-[max-content] px-[.6rem] py-[.3rem] rounded-[.6rem]",
        priority === "low" && "bg-[#FDF2F2] text-[#EC5962]",
        priority === "medium" && "bg-[#EEF3FF] text-[#3069FE]",
        priority === "high" && "bg-[#EBFAE2] text-[#4F9C20]"
      )}
    >
      {priority.toUpperCase()}
    </div>
  );
}
