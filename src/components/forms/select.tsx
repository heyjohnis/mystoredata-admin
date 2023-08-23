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
  diabled?: boolean;
};

export const Select: React.FC<SelectProps> = ({
  name,
  options,
  value,
  width = "w-full",
  placeholder = "::: 선택 :::",
  onChange,
  diabled = false,
}) => {
  return (
    <select
      name={name}
      className={`block ${width} border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 form-select focus:ring-blue-500 focus:border-blue-500 focus:ring-0 sm:text-sm rounded-md ${
        diabled && "bg-gray-100 dark:bg-gray-800"
      }`}
      onChange={onChange}
      defaultValue={value}
      disabled={diabled}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.key} value={option.key}>
          {option.value}
        </option>
      ))}
    </select>
  );
};
