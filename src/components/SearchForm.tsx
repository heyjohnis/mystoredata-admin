import {useEffect, useState} from "react";
import {Input} from "components/forms/input";
import {InputWrapper} from "components/forms/input-wrapper";
import {Label} from "components/forms/label";
import {CategorySelect} from "./CommonCodeSelect";
import {Category} from "data/commonCode";

export default function SearchForm({
  handleChange,
  handleClick,
  handleChangeName,
}: any): any {
  const [corpNum, setCorpNum] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [fromAt, setFromAt] = useState<string>("");
  const [toAt, setToAt] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const resetForm = () => {
    setCorpNum("");
    setUserId("");
    setFromAt("");
    setToAt("");
    setCategory("");
  };

  useEffect(() => {
    handleChange({corpNum, userId, fromAt, toAt, category});
  }, [corpNum, userId, fromAt, toAt, category]);

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
          onChange={(e) => setCategory(e.target.value)}
          codes={Category}
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
