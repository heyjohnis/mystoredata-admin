import {useEffect, useState} from "react";

import {TransMoneyProps} from "@/model/TransMoney";
import {ClassCategoryProps} from "@/model/ClassCategoryProps";
import {SearchProps} from "@/model/SearchForm";

import {useYearlyCategoryFinClass} from "@/hooks/useCategoryFinClass";
import {useYearlyFinStatusData} from "@/hooks/useFinStatusData";
import {POST} from "@/utils/restApi";

import TransMoneyLog from "@/components/trans-money/TransMoneyLog";
import FinClassStatus from "@/components/fin-status/FinClassStatus";
import FinStatusTradeKind from "@/components/fin-status/FinStatusTradeKind";
import SectionTitle from "@/components/ui/section-title";
import SearchForm from "@/components/SearchForm";
import Widget from "@/components/ui/widget";
import {dateChange} from "@/utils/date";

interface FinAmount {
  [key: string]: number;
}

const initFinAmount: FinAmount = {
  IN1: 0,
  IN2: 0,
  IN3: 0,
  OUT1: 0,
  OUT2: 0,
  OUT3: 0,
};

type assetProps = {
  account: string;
  itemName: string;
  amount: number;
};

const initCategory: ClassCategoryProps = {
  IN1: [],
  IN2: [],
  IN3: [],
  OUT1: [],
  OUT2: [],
  OUT3: [],
  IN_OUT2: [],
  IN_OUT3: [],
};

const initForm: SearchProps = {
  userId: "bethelean",
  fromAt: new Date().getFullYear() + "-01-01",
  toAt: dateChange(new Date(), -1).toISOString().slice(0, 10),
};

const Index: React.FC = () => {
  const [form, setForm] = useState<SearchProps>(initForm);
  const [finAmount, setFinAmount] = useState<FinAmount>(initFinAmount);
  const [accountAmount, setAccountAmount] = useState<assetProps[]>([]);
  const [logs, setLogs] = useState<TransMoneyProps[]>([]);
  const [category, setCategory] = useState<ClassCategoryProps>(initCategory);

  const categoryFinClass = useYearlyCategoryFinClass(form);
  useEffect(() => {
    setCategory(categoryFinClass);
  }, [categoryFinClass]);

  // 거래분류별 합산 금액
  const finStatusData = useYearlyFinStatusData(form);
  useEffect(() => {
    setFinAmount(finStatusData);
  }, [finStatusData]);

  const getTransData = (code: string, category = "") => {
    POST(`/trans/yearly-log`, {
      ...form,
      finClassCodes: code,
      useYn: true,
      category,
    }).then((res: any) => {
      console.log("transdata: ", res?.data);
      setLogs(res?.data);
    });
  };

  return (
    <>
      <SectionTitle title="Financial Status" subtitle="재정상태" />
      <Widget>
        <SearchForm form={form} handleChange={setForm} />

        <div className="justify-between">
          <div className="w-100 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-bold mb-3">거래분류</h2>
            <FinClassStatus finAmount={finAmount} getTransData={getTransData} />
          </div>
          <div className="w-100 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="w-full text-lg font-bold mb-3">제무재표</h2>
            <div className="w-full">
              <FinStatusTradeKind
                finAmount={finAmount}
                category={category}
                getTransData={getTransData}
                tradeKind={form?.tradeKind}
                inOutAccount={accountAmount}
              />
            </div>
          </div>
        </div>
      </Widget>
      <Widget>
        <TransMoneyLog logs={logs} />
      </Widget>
    </>
  );
};
export default Index;
