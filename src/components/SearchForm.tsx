import {useEffect, useState} from "react";
import {Input} from "components/forms/input";
import {InputWrapper} from "components/forms/input-wrapper";
import {Label} from "components/forms/label";

export default function SearchForm({handleChange, handleClick}: any): any {
  const [corpNum, setCorpNum] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [fromAt, setFromAt] = useState<string>("");
  const [toAt, setToAt] = useState<string>("");

  const resetForm = () => {
    setCorpNum("");
    setUserId("");
    setFromAt("");
    setToAt("");
  };

  useEffect(() => {
    handleChange({corpNum, userId, fromAt, toAt});
  }, [corpNum, userId, fromAt, toAt]);

  return (
    <div className="flex">
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
      <button
        className="px-4 py-2 text-xs font-bold text-white uppercase bg-blue-500 rounded-lg hover:bg-blue-600"
        onClick={handleClick}>
        개러내역취합
      </button>
    </div>
  );
}
