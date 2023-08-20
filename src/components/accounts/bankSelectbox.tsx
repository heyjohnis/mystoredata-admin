import {Select} from "components/forms/select";
import {BankCode} from "data/commonCode";

export default function BankSelectbox({
  onChange,
  selectedValue,
  isDisabled,
}: any) {
  const codes = Object.keys(BankCode).map((key) => ({
    key,
    value: BankCode[key],
  }));
  return (
    <Select
      width="w-25"
      name="bank"
      placeholder="은행선택"
      value={selectedValue}
      options={codes}
      onChange={onChange}
      isDisabled={isDisabled}
    />
  );
}
