import {useState} from "react";
import {Input} from "@/components/forms/input";
import {InputWrapper} from "@/components/forms/input-wrapper";
import {AccountProps} from "model/account";
import {POST} from "@/utils/restApi";
import {CorpType, BaroBankCode, setBankInput} from "../../data/commonCode";
import CommonCodeSelect from "@/components/CommonCodeSelect";

export default function AccountInput({addAccount, user}: any) {
  const [form, setForm] = useState<AccountProps>();
  const [ableWebId, setAbleWebId] = useState<boolean>(false);
  const [ableWebPwd, setAbleWebPwd] = useState<boolean>(false);
  const [useIndenty, setUseIndenty] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setForm((prevState: any) => ({...prevState, [name]: value}));
  };

  const bankSelectChange = (e: any) => {
    setAbleWebId(false);
    setAbleWebPwd(false);
    const {name, value} = e.target;
    const [idInput, pwInput, indentyInput] = setBankInput(value);
    setAbleWebId(!idInput);
    setAbleWebPwd(!pwInput);
    setUseIndenty(indentyInput);
    setForm((prevState: any) => ({...prevState, [name]: value}));
  };

  const regAccount = () => {
    POST("account/reg ", {
      ...form,
      corpNum: user.corpNum,
      corpName: user.corpName,
      user: user._id,
      userId: user.userId,
      birth: useIndenty ? user.birth : "",
    })
      .then((res: any) => {
        if (res?.status === 200) {
          if (res.data) addAccount(form);
        } else {
          alert("등록에 실패하였습니다");
        }
      })
      .catch((err: any) => {
        alert("등록에 실패하였습니다" + err.message);
      });
  };
  return (
    <div className="flex mb-1 justify-between">
      <div className="flex">
        <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
          <CommonCodeSelect
            name="bankAccountType"
            commonCode={CorpType}
            onChange={handleChange}
            placeholder="기업유형"
          />
        </InputWrapper>
        <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
          <CommonCodeSelect
            name="bank"
            commonCode={BaroBankCode}
            onChange={bankSelectChange}
            placeholder="은행선택"
          />
        </InputWrapper>
        <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
          <Input
            name="bankAccountNum"
            type="text"
            width="w-36"
            placeholder="계좌번호"
            value={form?.bankAccountNum}
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
          <Input
            name="bankAccountPwd"
            type="password"
            width="w-32"
            placeholder="계좌비밀번호"
            value={form?.bankAccountPwd}
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
          <Input
            name="webId"
            type="text"
            width="w-24"
            placeholder="로그인ID"
            value={form?.webId}
            onChange={handleChange}
            disabled={ableWebId}
          />
        </InputWrapper>
        <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
          <Input
            name="webPwd"
            type="password"
            width="w-24"
            placeholder="로그인PW"
            value={form?.webPwd}
            onChange={handleChange}
            disabled={ableWebPwd}
          />
        </InputWrapper>
      </div>
      <button
        type="button"
        onClick={regAccount}
        className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        저장
      </button>
    </div>
  );
}
