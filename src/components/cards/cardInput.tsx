import {useState} from "react";
import {Input} from "@/components/forms/input";
import {InputWrapper} from "@/components/forms/input-wrapper";
import {CardProps} from "model/card";
import {POST} from "@/utils/restApi";
import CommonCodeSelect from "@/components/CommonCodeSelect";
import {CardCode, CorpType, tradeKind} from "@/data/commonCode";

export default function CardInput({addCard, user}: any) {
  const [form, setForm] = useState<CardProps>();
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setForm((prevState: any) => ({...prevState, [name]: value}));
  };

  const regCard = () => {
    POST("card/reg", {
      ...form,
      user: user._id,
      userId: user.userId,
      corpNum: user.corpNum,
      corpName: user.corpName,
    }).then((res: any) => {
      // console.log(res);
      if (res?.status === 200) {
        addCard(form);
      } else {
        alert("등록에 실패하였습니다.\n" + res?.data.error.message);
      }
    });
  };
  return (
    <div className="flex mb-1 justify-between">
      <div className="flex">
        <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
          <CommonCodeSelect
            name="cardType"
            commonCode={CorpType}
            onChange={handleChange}
            placeholder="기업유형"
          />
        </InputWrapper>
        <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
          <CommonCodeSelect
            name="cardCompany"
            commonCode={CardCode}
            onChange={handleChange}
            placeholder="카드사선택"
          />
        </InputWrapper>
        <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
          <CommonCodeSelect
            name="tradeKind"
            commonCode={tradeKind}
            onChange={handleChange}
            placeholder="신용/체크"
          />
        </InputWrapper>
        <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
          <Input
            name="cardNum"
            type="text"
            width="w-36"
            placeholder="카드번호"
            value={form?.cardNum}
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
          />
        </InputWrapper>
      </div>
      <button
        type="button"
        onClick={regCard}
        className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        저장
      </button>
    </div>
  );
}
