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
      <label className="text-[1.4rem] text-techiBlack text-[500]">
        {title}{" "}
        {optional ? (
          <span className="text-[1.4rem] text-techiGreyShadeTwo">
            (Optional)
          </span>
        ) : (
          ""
        )}
      </label>
      <div
        className={`flex items-center ${
          error ? "border-techiRed " : "border-techiStrokeGrey"
        } border-[0.1rem] py-[1rem] px-[1.4rem] rounded-[.8rem] w-[100%] mt-[.6rem]`}
      >
        <div className="w-[100%]">
          {textArea ? (
            <textarea
              placeholder={placeholder}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              className="text-techiBlack text-[1.4rem] w-[100%] outline-none bg-white h-[9rem]"
            />
          ) : (
            <input
              type={type}
              placeholder={placeholder}
              name={name}
              onChange={onChange as ChangeEventHandler<HTMLInputElement>}
              onBlur={onBlur}
              value={value}
              className="text-techiBlack text-[1.4rem] w-[100%] outline-none bg-white "
            />
          )}
        </div>
      </div>
      {error && (
        <div className="text-[1.2rem] text-techiRed italic">{error}</div>
      )}
    </div>
  );
}
