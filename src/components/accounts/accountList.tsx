import { FiPlus } from 'react-icons/fi';
import { Input } from 'components/forms/input';
import { AccountProps } from 'model/account';
import { Select } from 'components/forms/select';
import BankSelectbox from './bankSelectbox';
import { useState } from 'react';
import { InputWrapper } from 'components/forms/input-wrapper';

export default function AccountList({ accounts }: any) {

  const [ form, setForm ] = useState<AccountProps>();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevState: any) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="w-full overflow-x-auto">
                
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <div className="text-l font-bold">계좌정보</div>
        </div>
      </div>
      <div className="w-full">
        <div className='flex'>
          <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
            <Select
                width="w-32"
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
            <Input name="bankAccountNum" type="text"  width="w-full" placeholder='계좌번호' value={form?.bankAccountNum} onChange={handleChange} />
          </InputWrapper>
        </div>
          { accounts.map((account: AccountProps, i: any) => (
        <div key={i} className='flex'>
          <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
              <BankSelectbox onChange={handleChange} selectedValue={account["bank"]} isDisabled={true} />
          </InputWrapper>
          <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
            <Select
              width="w-32"
              name="bankAccountType"
              placeholder='기업유형'
              value={account["bankAccountType"]}
              options={[
                  {key: "C", value: "법인"},
                  {key: "P", value: "개인"},
              ]}
              isDisabled={true}
              />
          </InputWrapper>
          <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2"> 
            <Input name="bankAccountNum" type="text"  width="w-full" placeholder='계좌번호' value={account?.bankAccountNum} onChange={handleChange} readOnly={true} />
          </InputWrapper>
          </div>
          )) }
      </div>
    </div>
  )
}
