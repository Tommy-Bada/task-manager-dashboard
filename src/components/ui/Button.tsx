interface ButtonProps {
  action: string;
  handleClick?: () => void;
  type: string;
}

export default function Button({ action, handleClick }: ButtonProps) {
  return (
    <button
      className="bg-techiPurple hover:bg-techiPurple/90 dark:bg-purple-600 dark:hover:bg-purple-700 
                 w-full text-white text-[1.6rem] rounded-[1.6rem] py-[1.2rem] transition-colors"
      onClick={handleClick}
    >
      {action}
    </button>
  );
}
