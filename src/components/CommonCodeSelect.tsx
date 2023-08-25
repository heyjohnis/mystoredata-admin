import {Select} from "components/forms/select";

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
