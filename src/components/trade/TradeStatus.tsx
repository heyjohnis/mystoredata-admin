import React, {useState, useEffect} from "react";
import {DateSelector} from "@/components/common/DateSelector";
import FinStatusTab from "@/components/fin-status/FinStatusTab";

const Title = ({children}: {children: React.ReactNode}) => {
  return <h2 className="m-auto my-3 text-lg font-bold">{children}</h2>;
};

export function TradeStatus() {
  const [form, setForm] = useState({});
  useEffect(() => {
    console.log("form: ", form);
  }, [form]);
  return (
    <>
      <div className="p-2">
        <h1 className="w-[40%] text-center m-auto mb-3 text-2xl">2023. 2. 5</h1>
        <DateSelector />
        <FinStatusTab setForm={setForm} />
        <Title>거래내역</Title>
        <div></div>
      </div>
    </>
  );
}
