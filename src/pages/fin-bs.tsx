import {useEffect, useState} from "react";

import {TransMoneyProps} from "model/TransMoney";
import {ClassCategoryProps} from "model/ClassCategoryProps";
import {SearchProps} from "model/SearchForm";
import {AccountLogProps} from "model/accountLog";
import {CardLogProps} from "model/cardLog";

import {useCategoryFinClass} from "hooks/useCategoryFinClass";
import {useFinStatusData} from "hooks/useFinStatusData";
import {useTransLogs} from "hooks/useTransLog";
import {useAccountLog} from "hooks/useAccountLog";
import {useCardLog} from "hooks/useCardLog";
import {useTaxLog} from "hooks/useTaxLog";

import {dateChange} from "utils/date";
import {isEmptyForm} from "utils/form";
import {POST} from "utils/restApi";

import TransMoneyLog from "components/trans-money/TransMoneyLog";
import FinClassStatus from "components/fin-status/FinClassStatus";
import FinStatusTradeKind from "components/fin-status/FinStatusTradeKind";
import SectionTitle from "components/section-title";
import SearchForm from "components/SearchForm";
import Widget from "components/widget";
import AccountLog from "components/account-log/AccountLog";
import FinStatusTab from "components/fin-status/FinStatusTab";
import CardLog from "components/card-log/CardLog";
import TaxLogs from "components/tax/TaxLog";
import {TaxLogProps} from "model/TaxLog";
import ModalFinStatus from "components/fin-status/ModalFinStatus";
import {InputWrapper} from "components/forms/input-wrapper";
import CommonCodeSelect from "components/CommonCodeSelect";
import {Label} from "components/forms/label";
import {Input} from "components/forms/input";

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
  const [accountLogs, setAccountLogs] = useState<AccountLogProps[]>([]);
  const [creditCardLogs, setCreditCardLogs] = useState<CardLogProps[]>([]);
  const [checkCardLogs, setCheckCardLogs] = useState<CardLogProps[]>([]);
  const [taxLogs, setTaxLogs] = useState<TaxLogProps[]>([]);
  const [category, setCategory] = useState<ClassCategoryProps>(initCategory);
  const [finData, setFinData] = useState<TransMoneyProps[]>([]);
  const [userId, setUserId] = useState<string>("");

  const handleChange = (e: any) => {
    setForm((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    getTransData();
  };

  const getTransData = () => {
    POST(`annual/year`, {
      ...form,
    }).then((res: any) => {
      console.log("transdata: ", res?.data?.category);
      setCategory(res?.data?.category);
    });
  };

  useEffect(() => {}, [category]);

  return (
    <>
      <SectionTitle title="Financial Status" subtitle="재무상태" />
      <Widget>
        <div className="flex m-3">
          <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
            <Label>사용자ID</Label>
            <Input
              name="userId"
              type="text"
              value={form.userId}
              onChange={handleChange}
            />
          </InputWrapper>

          <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
            <Label>연도</Label>
            <CommonCodeSelect
              name="year"
              onChange={handleChange}
              value={form?.year}
              commonCode={{"2023": "2023", "2024": "2024"}}
            />
          </InputWrapper>

          <button
            className="px-4 py-2 text-xs font-bold text-white uppercase bg-gray-500 rounded-lg hover:bg-gray-600 mr-1"
            onClick={handleSubmit}>
            조회
          </button>
        </div>

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
