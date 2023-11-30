import {useEffect, useState} from "react";
import {Input} from "components/forms/input";
import {InputWrapper} from "components/forms/input-wrapper";
import {Label} from "components/forms/label";
import {CategorySelect} from "./CommonCodeSelect";
import {Category, FinClassCode, TradeKind, UseKind} from "data/commonCode";
import CommonCodeSelect from "components/CommonCodeSelect";
import {set} from "nprogress";
import {SearchProps} from "model/SearchForm";

type props = {
  handleChange: (e: any) => void;
  handleClick?: () => void;
  handleChangeName?: string;
  form: SearchProps;
};

export default function SearchForm({
  handleChange,
  handleClick,
  handleChangeName,
  form,
}: props) {
  const [corpNum, setCorpNum] = useState<string>(form?.corpNum || "");
  const [userId, setUserId] = useState<string>(form?.userId || "");
  const [fromAt, setFromAt] = useState<string>(form?.fromAt || "");
  const [toAt, setToAt] = useState<string>(form?.toAt || "");
  const [finClassCode, setFinClassCode] = useState<string>(
    form?.finClassCode || ""
  );
  const [category, setCategory] = useState<string>(form?.category || "");
  const [tradeKind, setTradeKind] = useState<string>(form?.tradeKind || "");
  const [useKind, setUseKind] = useState<string>(form?.useKind || "");
  const resetForm = () => {
    setCorpNum("");
    setUserId("");
    setFromAt("");
    setToAt("");
    setCategory("");
    setFinClassCode("");
    setTradeKind("");
    setUseKind("");
  };

  useEffect(() => {
    console.log("form: ", form);
    handleChange({
      ...form,
      corpNum,
      userId,
      fromAt,
      toAt,
      category,
      finClassCode,
      tradeKind,
    });
  }, [corpNum, userId, fromAt, toAt, category, finClassCode, tradeKind]);

  return (
    <div className="flex m-3">
      <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
        <Label>사업자번호</Label>
        <Input
          name="corpNum"
          type="text"
          value={corpNum}
          onChange={(e) => setCorpNum(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
        <Label>사용자ID</Label>
        <Input
          name="userId"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
        <Label>카테고리</Label>
        <CategorySelect
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          codes={Category}
        />
      </InputWrapper>
      <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
        <Label>거래유형</Label>
        <CommonCodeSelect
          name="tradeKind"
          onChange={(e) => setTradeKind(e.target.value)}
          value={tradeKind}
          commonCode={TradeKind}
        />
      </InputWrapper>
      <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
        <Label>거래유형</Label>
        <CommonCodeSelect
          name="useKind"
          onChange={(e) => setTradeKind(e.target.value)}
          value={useKind}
          commonCode={UseKind}
        />
      </InputWrapper>
      <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
        <Label>거래분류</Label>
        <CommonCodeSelect
          name="finClassCode"
          onChange={(e) => setFinClassCode(e.target.value)}
          value={finClassCode}
          commonCode={FinClassCode}
        />
      </InputWrapper>
      <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
        <Label>시작일</Label>
        <Input
          name="fromAt"
          type="date"
          value={fromAt}
          onChange={(e) => setFromAt(e.target.value)}
          placeholder="YYYYMMDD"
        />
      </InputWrapper>
      <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
        <Label>종료일</Label>
        <Input
          name="toAt"
          type="date"
          value={toAt}
          onChange={(e) => setToAt(e.target.value)}
          placeholder="YYYYMMDD"
        />
      </InputWrapper>

      <button
        className="px-4 py-2 text-xs font-bold text-white uppercase bg-gray-500 rounded-lg hover:bg-gray-600 mr-1"
        onClick={resetForm}>
        RESET
      </button>
      {handleChangeName && (
        <button
          className="px-4 py-2 text-xs font-bold text-white uppercase bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={handleClick}>
          {handleChangeName}
        </button>
      )}
    </div>
  );
}
