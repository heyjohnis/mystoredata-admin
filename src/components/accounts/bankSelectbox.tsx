import { Select } from 'components/forms/select';

export default function BankSelectbox({ onChange, selectedValue, isDisabled }: any) {
  console.log({selectedValue});
  return (
    <Select
      width="w-25"
      name="bankAccountType"
      placeholder='은행선택'
      value={selectedValue}
      options={[
          {key: "KB", value: "국민은행"},
          {key: "SHINHAN", value: "신한은행"},
          {key: "NH", value: "농협은행"},
          {key: "HANA", value: "하나은행"},
          {key: "SC", value: "제일은행"},
          {key: "WOORI", value: "우리은행"},
          {key: "IBK", value: "기업은행"},
          {key: "KDB", value: "산업은행"},
          {key: "KFCC", value: "새마을금고"},
          {key: "CITI", value: "씨티은행"},
          {key: "SUHYUP", value: "수협은행"},
          {key: "CU", value: "신협은행"},
          {key: "EPOST", value: "우체국"},
          {key: "KJBANK", value: "광주은행"},
          {key: "JBBANK", value: "전북은행"},
          {key: "DGB", value: "대구은행"},
          {key: "BUSANBANK", value: "부산은행"},
          {key: "KNBANK", value: "경남은행"},
          {key: "EJEJUBANK", value: "제주은행"},
          {key: "KBANK", value: "케이뱅크"},
      ]}
      onChange={ onChange }
      isDisabled={isDisabled}
    />
  )
}
