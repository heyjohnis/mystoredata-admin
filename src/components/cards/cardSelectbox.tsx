import { Select } from 'components/forms/select';

export default function CardSelectbox({ onChange, selectedValue, isDisabled }: any) {
  console.log({selectedValue});
  return (
    <Select
      width="w-25"
      name="bankAccountType"
      placeholder='카드사선택'
      value={selectedValue}
      options={[
          {key: "KB", value: "국민은행"},
          {key: "BC", value: "비씨카드"},
          {key: "HANA", value: "하나SK카드"},
          {key: "HYUNDAI", value: "현대카드"},
          {key: "KB", value: "KB카드"},
          {key: "CITI", value: "씨티카드"},
          {key: "LOTTE", value: "롯데카드"},
          {key: "NH", value: "농협NH카드"},
          {key: "SAMSUNG", value: "삼성카드"},
          {key: "SHINHAN", value: "신한카드"},
          {key: "WOORI", value: "우리카드"},
      ]}
      onChange={ onChange }
      isDisabled={isDisabled}
    />
  )
}
