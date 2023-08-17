import { useState } from 'react';
import { Input } from 'components/forms/input';
import { InputWrapper } from 'components/forms/input-wrapper';
import { Select } from 'components/forms/select';
import CardSelectbox from './cardSelectbox';
import { CardProps } from 'model/card';
import { POST } from 'utils/restApi';

export default function CardInput( { addCard, user }: any) {
  const [ form, setForm ] = useState<CardProps>();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const regCard = () => {
    POST('card/reg ', {...form, user: user._id}).then((res: any) => {
      console.log(res);
      if(res?.status === 200) {
        addCard(form);
      } else {
        alert('등록에 실패하였습니다.\n' + res?.data.error.message);
      }
    });

  }
  return (
    <div className='flex mb-1 justify-between'>
        <div className='flex'>
          <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
            <Select
              width="w-25"
              name="cardType"
              placeholder='기업유형'
              options={[
                {key: "C", value: "법인"},
                {key: "P", value: "개인"},
              ]}
              onChange={handleChange}
              />
          </InputWrapper>
          <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
            <CardSelectbox onChange={handleChange} />
          </InputWrapper>
          <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
            <Input name="cardNum" type="text" width="w-36" placeholder='카드번호' value={form?.cardNum} onChange={handleChange} />
          </InputWrapper>
          <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
          <Input name="webId" type="text" width="w-24" placeholder='로그인ID' value={form?.webId} onChange={handleChange} />
          </InputWrapper>
          <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
            <Input name="webPwd" type="password"  width="w-24" placeholder='로그인PW' value={form?.webPwd} onChange={handleChange} />
          </InputWrapper>
      </div>
      <button
        type="button"
        onClick={regCard}
        className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        저장
      </button>
    </div>
  )
}
