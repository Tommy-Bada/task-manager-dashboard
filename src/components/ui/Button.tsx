interface ButtonProps {
  action: string;
  handleClick: () => void;
}
export default function Button({ action, handleClick }: ButtonProps) {
  return (
    <button
      className="bg-techiPurple w-[100%] text-white text-[1.6rem] rounded-[1.6rem] py-[1.2rem]"
      onClick={handleClick}
    >
      {action}
    </button>
  );
}
