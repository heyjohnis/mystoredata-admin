export interface OptionProps {
  key: any;
  value: any;
}

export type SelectProps = {
  name: string;
  options: OptionProps[];
  placeholder?: string;
  width?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
};

export const Select: React.FC<SelectProps> = ({
  name,
  options,
  value,
  width = "w-full",
  placeholder = "::: 선택 :::",
  onChange,
  disabled = false,
}) => {
  return (
    <select
      name={name}
      className={`block ${width} border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 form-select focus:ring-blue-500 focus:border-blue-500 focus:ring-0 sm:text-sm rounded-md ${
        disabled && "bg-gray-100 dark:bg-gray-800"
      }`}
      onChange={onChange}
      value={value}
      disabled={disabled}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.key} value={option.key}>
          {option.value}
        </option>
      ))}
    </select>
  );
};
