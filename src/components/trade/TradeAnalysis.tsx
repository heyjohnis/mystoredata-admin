import React, {useState, useEffect} from "react";
import {DateSelector} from "@/components/common/DateSelector";
import {SearchProps} from "@/model/SearchForm";
import {POST} from "@/utils/restApi";
import {dateChange} from "@/utils/date";
import {TransMoneyProps} from "@/model/TransMoney";
import {ClassCategoryProps} from "@/model/ClassCategoryProps";
import {AccountLogProps} from "@/model/accountLog";
import {CardLogProps} from "@/model/cardLog";
import {useCategoryFinClass} from "@/hooks/useCategoryFinClass";
import {useFinStatusData} from "@/hooks/useFinStatusData";
import {useTransLogs} from "@/hooks/useTransLog";
import {useAccountLog} from "@/hooks/useAccountLog";
import {useCardLog} from "@/hooks/useCardLog";
import {useTaxLog} from "@/hooks/useTaxLog";
import {isEmptyForm} from "@/utils/form";
import FinStatusTab from "@/components/fin-status/FinStatusTab";
import {TaxLogProps} from "@/model/TaxLog";
import TradeLogComp from "./TradeLogComp";
import {ModalTradeStatusDetail} from "./ModalTradeStatusDetail";
const Title = ({children}: {children: React.ReactNode}) => {
  return (
    <h2 className="w-full m-auto mt-4 mb-2 text-lg font-bold">{children}</h2>
  );
};
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
  fromAt: dateChange(new Date(), -1).toISOString().slice(0, 10),
  toAt: dateChange(new Date(), -1).toISOString().slice(0, 10),
  displayDate: dateChange(new Date(), -1).toISOString().slice(0, 10),
  dateUnit: "day",
};

export function TradeAnalysis() {
  const [form, setForm] = useState<SearchProps>(initForm);
  const [finAmount, setFinAmount] = useState<FinAmount>(initFinAmount);
  const [logs, setLogs] = useState<TransMoneyProps[]>([]);
  const [log, setLog] = useState<TransMoneyProps | null>(null);
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
    POST(`/trans/log`, {
      ...form,
      finClassCodes: code,
      useYn: true,
      category,
    }).then((res: any) => {
      console.log("transdata: ", res.data);
      setLogs(res.data);
    });
  };

  const closedModal = (isUpdated = false) => {
    console.log("closedModal");
  };

  const openModalFinStatus = (log: any) => {
    setLog(log);
    console.log("openModalFinStatus: ", log._id);
    if (log.bank) log.bank && setTradeKind("CASH");
    if (log.card) log.card && setTradeKind("CRDIT");
    if (log.taxType) log.taxType && setTradeKind("BILL");

    POST(`/trans/trade-item`, {_id: log._id}).then((res: any) => {
      console.log("trade-item: ", res.data);
      setFinData(res.data);
    });
  };

  useEffect(() => {
    console.log("form: ", form);
  }, [form]);
  return (
    <>
      <div className="sticky top-0 p-5 pb-0 m-0 z-[100] bg-white ">
        <h1 className="w-[60%] text-center m-auto mb-2 text-2xl">
          {form.displayDate}
        </h1>
        <DateSelector form={form} setForm={setForm} />
      </div>
      <div>
        <div className="p-5 pt-1 m-0 bg-white ">
          <FinStatusTab setForm={setForm} />
        </div>
        <div className="p-5 pt-0">
          {["CASH", ""].includes(form?.tradeKind || "") && (
            <div className="relative">
              <Title>통장거래</Title>
              <div className="w-100 p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-900 max-h-96	 overflow-y-auto">
                <TradeLogComp
                  logs={accountLogs}
                  handleClick={openModalFinStatus}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent blur-sm"></div>
              </div>
            </div>
          )}
          {["CHECK", ""].includes(form?.tradeKind || "") && (
            <div className="relative">
              <Title>체크카드거래</Title>
              <div className="w-100 p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800 max-h-80 overflow-y-auto">
                <TradeLogComp
                  logs={checkCardLogs}
                  handleClick={openModalFinStatus}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent blur-sm"></div>
              </div>
            </div>
          )}
          {["CREDIT", ""].includes(form?.tradeKind || "") && (
            <div className="relative">
              <Title>신용카드거래</Title>
              <div className="w-100 p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800 max-h-80 overflow-y-auto">
                <TradeLogComp
                  logs={creditCardLogs}
                  handleClick={openModalFinStatus}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent blur-sm"></div>
              </div>
            </div>
          )}
          {["BILL", ""].includes(form?.tradeKind || "") && (
            <div className="relative">
              <Title>세금계산서</Title>
              <div className="w-100 p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800 max-h-80 overflow-y-auto">
                <TradeLogComp logs={taxLogs} handleClick={openModalFinStatus} />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent blur-sm"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ModalTradeStatusDetail
        log={log}
        finData={finData}
        closedModal={closedModal}
        tradeKind={tradeKind}
      />
    </>
  );
}
