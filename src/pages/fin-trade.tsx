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
  fromAt: dateChange(new Date(), -1).toISOString().slice(0, 10),
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
  const [tradeKind, setTradeKind] = useState<string>("");
  // 통장거래내역
  const accountLog = useAccountLog(form);
  useEffect(() => {
    if (!isEmptyForm(form)) return;
    setAccountLogs(accountLog);
  }, [form, accountLog]);

  // 카드거래내역
  const checkCardLog = useCardLog(form, "CHECK");
  useEffect(() => {
    if (!isEmptyForm(form)) return;
    setCheckCardLogs(checkCardLog);
  }, [form, checkCardLog]);

  // 카드거래내역
  const creditCardLog = useCardLog(form, "CREDIT");
  useEffect(() => {
    if (!isEmptyForm(form)) return;
    setCreditCardLogs(creditCardLog);
  }, [form, creditCardLog]);

  // 세금계산서내역
  const taxLog = useTaxLog(form);
  useEffect(() => {
    if (!isEmptyForm(form)) return;
    setTaxLogs(taxLog);
  }, [form, taxLog]);

  // 전체거래내역조회
  const transLog = useTransLogs(form);
  useEffect(() => {
    if (!isEmptyForm(form)) return;
    setLogs(transLog);
  }, [form, transLog]);

  // 거래분류별 카고고리 합산 리스트
  const categoryFinClass = useCategoryFinClass(form);
  useEffect(() => {
    setCategory(categoryFinClass);
  }, [categoryFinClass]);

  // 거래분류별 합산 금액
  const finStatusData = useFinStatusData(form);
  useEffect(() => {
    setFinAmount(finStatusData);
  }, [finStatusData]);

  const getTransData = (code: string, category = "") => {
    POST(`trans/log`, {
      ...form,
      finClassCodes: code,
      useYn: true,
      category,
    }).then((res: any) => {
      console.log("transdata: ", res.data);
      setLogs(res.data);
    });
  };

  const openModalFinStatus = (log: any) => {
    console.log("openModalFinStatus: ", log._id);
    if (log.bank) log.bank && setTradeKind("CASH");
    if (log.card) log.card && setTradeKind("CRDIT");
    if (log.taxType) log.taxType && setTradeKind("BILL");

    POST(`trans/trade-item`, {_id: log._id}).then((res: any) => {
      console.log("trade-item: ", res.data);
      setFinData(res.data);
    });
  };

  const closedModal = (isUpdated = false) => {
    console.log("closedModal");
  };
  return (
    <>
      <SectionTitle title="Financial Status" subtitle="재정상태" />
      <Widget>
        <SearchForm form={form} handleChange={setForm} />

        <FinStatusTab setForm={setForm} />
        {["CASH", ""].includes(form?.tradeKind || "") && (
          <div className="justify-between">
            <div className="w-100 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
              <h2 className="text-lg font-bold mb-3">통장거래</h2>
              <AccountLog logs={accountLogs} handleClick={openModalFinStatus} />
            </div>
          </div>
        )}
        {["CHECK", ""].includes(form?.tradeKind || "") && (
          <div className="justify-between">
            <div className="w-100 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
              <h2 className="text-lg font-bold mb-3">체크카드거래</h2>
              <CardLog logs={checkCardLogs} handleClick={openModalFinStatus} />
            </div>
          </div>
        )}
        {["CREDIT", ""].includes(form?.tradeKind || "") && (
          <div className="justify-between">
            <div className="w-100 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
              <h2 className="text-lg font-bold mb-3">신용카드거래</h2>
              <CardLog logs={creditCardLogs} handleClick={openModalFinStatus} />
            </div>
          </div>
        )}
        {["BILL", ""].includes(form?.tradeKind || "") && (
          <div className="justify-between">
            <div className="w-100 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
              <h2 className="text-lg font-bold mb-3">세금계산서</h2>
              <TaxLogs logs={taxLogs} handleClick={openModalFinStatus} />
            </div>
          </div>
        )}
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
        <TransMoneyLog
          logs={logs}
          reload={() => {
            console.log("reload");
          }}
        />
      </Widget>
      <ModalFinStatus
        finData={finData}
        closedModal={closedModal}
        tradeKind={tradeKind}
      />
    </>
  );
};
export default Index;
