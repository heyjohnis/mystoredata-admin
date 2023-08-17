import { Select } from 'components/forms/select';
import { CardCode } from 'data/commonCode';

export default function CardSelectbox({ onChange, selectedValue, isDisabled }: any) {
  console.log({selectedValue});
  const codes = Object.keys(CardCode).map((key) => ( { key, value: CardCode[key] } ));  

  return (
    <Select
      width="w-25"
      name="cardCompany"
      placeholder='카드사선택'
      value={selectedValue}
      options={codes}
      onChange={ onChange }
      isDisabled={isDisabled}
    />
  )
}
