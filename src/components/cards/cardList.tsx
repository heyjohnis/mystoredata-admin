import { Input } from 'components/forms/input';
import { CardProps } from 'model/card';
import { Select } from 'components/forms/select';
import CardSelectbox from './cardSelectbox';
import { useState } from 'react';
import { InputWrapper } from 'components/forms/input-wrapper';
import CardInput from './cardInput';
import { DELETE, POST } from 'utils/restApi';

export default function CardList({ cards, user }: any) {

  const [ form, setForm ] = useState<CardProps>();
  const [ cardList, setCardList ] = useState<CardProps[]>(cards);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const addCard = (card: CardProps) => {
    setCardList((prevState: any) => ([ ...prevState, card]));
  };

  const cardDetail = () => {

  };

  const cardDelete = (card: CardProps) => {
    DELETE('card/delete', {...card, corpNum: user.corpNum}).then((res: any) => {
      console.log('card/delete: ', res);
      if(res?.status === 200) {
        setCardList(cardList.filter((item: CardProps) => item.cardNum !== card.cardNum));
      } else {

      }
    }).catch((err: any) => {
      console.log('card/delete: ', err);
    });
  };

  const syncCardLog = (card: CardProps) => {
    console.log("card sync: ", card);
    POST('card/regLog', {...card, corpNum: user.corpNum}).then((res: any) => {
      console.log('card/regLog: ', res);
    }).catch((err: any) => {
      console.log('card/regLog: ', err);
    });
  };

  return (
    <div className="w-full overflow-x-auto mt-3">
                
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <div className="text-l font-bold">카드정보</div>
        </div>
      </div>
      <div className="w-full">
        <CardInput addCard={addCard} user={user} />
      { cardList && cardList.map((card: CardProps, i: any) => (
        <div key={i} className='flex justify-between'>
          <div className='flex'>
            <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
              <Select
                width="w-25"
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
                <CardSelectbox onChange={handleChange} selectedValue={card["cardCompany"]} isDisabled={true} />
            </InputWrapper>

            <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
              <Input name="bankAccountNum" type="text"  width="w-36" placeholder='계좌번호' value={card?.cardNum} onChange={handleChange} readOnly={true} />
            </InputWrapper>
          </div>
          <div className='flex'>
            <button
              type="button"
              onClick={() => syncCardLog(card)}
              className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              데이터수집
            </button>
            <button
              type="button"
              onClick={() => cardDetail()}
              className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              상세보기
            </button>
            <button
              type="button"
              onClick={() => cardDelete(card)}
              className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-gray-500 rounded-lg hover:bg-blue-600"
            >
              삭제
            </button>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}
