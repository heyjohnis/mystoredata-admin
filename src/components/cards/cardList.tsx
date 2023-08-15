import { Input } from 'components/forms/input';
import { CardProps } from 'model/card';
import { Select } from 'components/forms/select';
import CardSelectbox from './cardSelectbox';
import { useState } from 'react';
import { InputWrapper } from 'components/forms/input-wrapper';
import CardInput from './cardInput';

export default function CardList({ cards }: any) {

  const [ form, setForm ] = useState<CardProps>();
  const [ cardList, setCardList ] = useState<CardProps[]>(cards);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const addAccout = (card: CardProps) => {
    setCardList((prevState: any) => ({ ...prevState, card}));
  };

  const accountDetail = () => {

  };

  const accountDelete = () => {

  };

  return (
    <div className="w-full overflow-x-auto">
                
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <div className="text-l font-bold">계좌정보</div>
        </div>
      </div>
      <div className="w-full">
        <CardInput addAccout={addAccout} />
      { cardList.map((card: CardProps, i: any) => (
        <div key={i} className='flex'>
          <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
              <CardSelectbox onChange={handleChange} selectedValue={card["cardCompany"]} isDisabled={true} />
          </InputWrapper>
          <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
            <Select
              width="w-32"
              name="bankAccountType"
              placeholder='기업유형'
              value={card["cardType"]}
              options={[
                  {key: "C", value: "법인"},
                  {key: "P", value: "개인"},
              ]}
              isDisabled={true}
              />
          </InputWrapper>
          <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
            <Input name="bankAccountNum" type="text"  width="w-36" placeholder='계좌번호' value={card?.cardNum} onChange={handleChange} readOnly={true} />
          </InputWrapper>
          <button
            type="button"
            onClick={() => accountDetail()}
            className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            상세보기
          </button>
          <button
            type="button"
            onClick={accountDelete}
            className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-gray-500 rounded-lg hover:bg-blue-600"
          >
            삭제
          </button>
        </div>
        ))}
      </div>
    </div>
  )
}
