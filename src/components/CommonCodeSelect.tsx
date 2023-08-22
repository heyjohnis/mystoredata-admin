import {Select} from "components/forms/select";
import {BankCode} from "data/commonCode";

export default function CommonCodeSelect({
  commonCode,
  onChange,
  selectedValue,
  isDisabled,
  name,
}) {
  const codes = Object.keys(commonCode).map((key) => ({
    key,
    value: commonCode[key],
  }));

  return (
    <Select
      width="w-25"
      name="bank"
      placeholder={commonCode[""]}
      value={selectedValue}
      options={codes}
      onChange={onChange}
      isDisabled={isDisabled}
    />
  );
}
