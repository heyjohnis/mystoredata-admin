import {Select} from "components/forms/select";
import {CategoryProps} from "model/Category";

type CommonCodeSelectProps = {
  name: string;
  commonCode: Record<string, string>;
  value?: string;
  onChange?: (e: any) => void;
  width?: string;
  diabled?: boolean;
  placeholder?: string;
};
export default function CommonCodeSelect({
  name,
  commonCode,
  value,
  onChange,
  width,
  diabled,
  placeholder,
}: CommonCodeSelectProps) {
  const codes = commonCode
    ? Object.keys(commonCode).map((key) => ({
        key,
        value: commonCode[key],
      }))
    : [];

  return (
    <Select
      width={width || "w-25"}
      name={name}
      value={value}
      options={codes}
      onChange={onChange}
      placeholder={placeholder}
      diabled={diabled}
    />
  );
}

type CategorySelectProps = {
  name: string;
  codes: Array<CategoryProps>;
  value?: string;
  onChange?: (e: any) => void;
  width?: string;
  diabled?: boolean;
  placeholder?: string;
};
export function CategorySelect({
  name,
  codes,
  value,
  onChange,
  diabled,
  width = "w-full",
  placeholder = "::: 선택 :::",
}: CategorySelectProps) {
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
      {(codes || []).map((code) => (
        <option key={code.code} value={code.code}>
          {code.name}
        </option>
      ))}
    </select>
  );
}
