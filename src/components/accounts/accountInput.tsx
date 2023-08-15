import { useState } from 'react';
import { Input } from 'components/forms/input';
import { InputWrapper } from 'components/forms/input-wrapper';
import { Select } from 'components/forms/select';
import BankSelectbox from './bankSelectbox';
import { AccountProps } from 'model/account';
import { POST } from 'utils/restApi';

export default function AccountInput( { addAccout }: any) {
  const [ form, setForm ] = useState<AccountProps>();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const regAccount = () => {
    POST('account/reg ', form)

  }
  return (
    <div className='flex mb-1'>
      <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
        <Select
          width="w-25"
          name="bankAccountType"
          placeholder='기업유형'
          options={[
            {key: "C", value: "법인"},
            {key: "P", value: "개인"},
          ]}
          onChange={handleChange}
          />
      </InputWrapper>
      <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
        <BankSelectbox onChange={handleChange} />
      </InputWrapper>
      <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
        <Input name="bankAccountNum" type="text" width="w-36" placeholder='계좌번호' value={form?.bankAccountNum} onChange={handleChange} />
      </InputWrapper>
      <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
      <Input name="webId" type="text" width="w-24" placeholder='로그인ID' value={form?.webId} onChange={handleChange} />
      </InputWrapper>
      <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
        <Input name="webPwd" type="password"  width="w-24" placeholder='로그인PW' value={form?.webPwd} onChange={handleChange} />
      </InputWrapper>
      <button
        type="button"
        onClick={regAccount}
        className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        저장
      </button>
    </div>
  )
}
