import { ChangeEventHandler } from "react";

interface InputFieldProps {
  title: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  error?: string | null;
  value: string;
  optional?: boolean;
  type?: string;
  placeholder: string;
  textArea?: boolean;
}

export default function InputField({
  title,
  error,
  name,
  onChange,
  onBlur,
  value,
  optional,
  type,
  placeholder,
  textArea,
}: InputFieldProps) {
  return (
    <div className="my-[1.2rem]">
      <label className="text-[1.4rem] text-techiBlack dark:text-white font-medium">
        {title}{" "}
        {optional && (
          <span className="text-[1.4rem] text-techiGreyShadeTwo dark:text-gray-400">
            (Optional)
          </span>
        )}
      </label>
      <div
        className={`flex items-center border-[0.1rem] py-[1rem] px-[1.4rem] rounded-[.8rem] w-full mt-[.6rem]
          ${
            error
              ? "border-techiRed dark:border-red-500"
              : "border-techiStrokeGrey dark:border-gray-600"
          }
          bg-white dark:bg-gray-800 focus-within:border-techiPurple dark:focus-within:border-purple-500
        `}
      >
        <div className="w-full">
          {textArea ? (
            <textarea
              placeholder={placeholder}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              className="text-techiBlack dark:text-white text-[1.4rem] w-full outline-none 
                         bg-transparent h-[9rem] placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          ) : (
            <input
              type={type}
              placeholder={placeholder}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              className="text-techiBlack dark:text-white text-[1.4rem] w-full outline-none 
                         bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          )}
        </div>
      </div>
      {error && (
        <div className="text-[1.2rem] text-techiRed dark:text-red-400 italic mt-1">
          {error}
        </div>
      )}
    </div>
  );
}
