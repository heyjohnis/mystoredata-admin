import React, {ChangeEvent} from "react";

export type InputProps = {
  name: string;
  type:
    | "text"
    | "email"
    | "url"
    | "password"
    | "date"
    | "datetime-local"
    | "month"
    | "search"
    | "tel"
    | "time"
    | "week";
  width?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void; // onChange 이벤트 핸들러 함수
  readOnly?: boolean;
  disabled?: boolean;
};

export const Input: React.FC<InputProps> = ({
  name,
  type,
  width = "w-full",
  placeholder = "",
  value = "",
  onChange, // 새로운 prop으로 추가된 onChange
  readOnly = false,
  disabled = false,
}) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      name={name}
      className={`form-input block ${width} border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 flex-grow-1 focus:border-blue-500 focus:ring-0 sm:text-sm rounded-md ${
        readOnly || disabled ? "bg-gray-100 dark:bg-gray-800 text-gray-500" : ""
      }`}
      value={value}
      onChange={onChange} // 전달된 onChange 이벤트 핸들러 함수
      readOnly={readOnly ? true : false}
      disabled={disabled ? true : false}
    />
  );
};
