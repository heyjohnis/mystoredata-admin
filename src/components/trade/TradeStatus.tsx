import {useEffect, useState} from "react";

import {TransMoneyProps} from "@/model/TransMoney";
import {ClassCategoryProps} from "@/model/ClassCategoryProps";
import {SearchProps} from "@/model/SearchForm";
import {AccountLogProps} from "@/model/accountLog";
import {CardLogProps} from "@/model/cardLog";

import {useCategoryFinClass} from "@/hooks/useCategoryFinClass";
import {useFinStatusData} from "@/hooks/useFinStatusData";
import {useTransLogs} from "@/hooks/useTransLog";
import {useAccountLog} from "@/hooks/useAccountLog";
import {useCardLog} from "@/hooks/useCardLog";
import {useTaxLog} from "@/hooks/useTaxLog";

import {dateChange} from "@/utils/date";
import {isEmptyForm} from "@/utils/form";
import {POST} from "@/utils/restApi";

import TransMoneyLog from "@/components/trans-money/TransMoneyLog";
import FinClassStatus from "@/components/fin-status/FinClassStatus";
import FinStatusTradeKind from "@/components/fin-status/FinStatusTradeKind";
import SectionTitle from "@/components/ui/section-title";
import SearchForm from "@/components/SearchForm";
import Widget from "@/components/ui/widget";
import AccountLog from "@/components/account-log/AccountLog";
import FinStatusTab from "@/components/fin-status/FinStatusTab";
import CardLog from "@/components/card-log/CardLog";
import TaxLogs from "@/components/tax/TaxLog";
import {TaxLogProps} from "@/model/TaxLog";
import ModalFinStatus from "@/components/fin-status/ModalFinStatus";
import {dateToString} from "@/utils/date";
import {finNumber} from "@/utils/finNumber";
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
};

export function TradeStatus() {
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

  const openModalFinStatus = (log: any) => {
    console.log("openModalFinStatus: ", log._id);
    if (log.bank) log.bank && setTradeKind("CASH");
    if (log.card) log.card && setTradeKind("CRDIT");
    if (log.taxType) log.taxType && setTradeKind("BILL");

    POST(`/trans/trade-item`, {_id: log._id}).then((res: any) => {
      console.log("trade-item: ", res.data);
      setFinData(res.data);
    });
  };

  return (
    <>
      <div className="sticky top-0 p-5 pb-0 m-0 bg-white ">
        <h1 className="w-[60%] text-center m-auto mb-2 text-2xl">
          {form.displayDate}
        </h1>
      </div>
      <div className="mt-5 p-5 pt-0">
        <div className="w-100 p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800 max-h-80 overflow-y-auto">
          <h2 className="pb-3 text-lg font-bold mb-3 border-b">거래분류</h2>
          <FinClassStatus finAmount={finAmount} getTransData={getTransData} />
        </div>

        <h2 className="w-full text-lg font-bold mt-5 mb-2">당일제무재표</h2>
        <div className="w-100 p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800 max-h-80 overflow-y-auto">
          <div className="border-b border-gray-100 flex justify-between">
            <label className="w-20 block text-sm font-bold text-gray-700 dark:text-gray-200">
              {tradeKind === "CASH" ? "수입" : "수익"}
            </label>
            <ul>
              {category.IN1.map((data, index) => (
                <li key={index} className="flex justify-between">
                  <label className="text-right">{data.categoryName}</label>
                  <div className="w-24 text-right">
                    {finNumber(data.transMoney)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between">
            <label className="w-20 block text-sm font-bold text-gray-700 dark:text-gray-200">
              {tradeKind === "CASH" ? "지출" : "비용"}
            </label>
            <ul>
              {category.OUT1.map((data, index) => (
                <li key={index} className="flex justify-between">
                  {" "}
                  <label className="text-right">{data.categoryName}</label>
                  <div className="w-24 text-right">
                    {finNumber(data.transMoney)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-100 mt-3 p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800 max-h-80 overflow-y-auto">
          <div className="border-b border-gray-100 flex justify-between">
            <label className="w-20 block text-sm font-bold text-gray-700 dark:text-gray-200">
              자산
            </label>
            <div>
              <ul>
                {category.IN3.map((data, index) => (
                  <li key={index} className="flex justify-between">
                    {" "}
                    <label className="text-right">{data.categoryName}</label>
                    <div className="w-24 text-right">
                      {finNumber(data.transMoney)}
                    </div>
                  </li>
                ))}
                {category.OUT3.map((data, index) => (
                  <li className="flex justify-between">
                    <label className="text-right">{data.categoryName}</label>
                    <div className="w-24 text-right">
                      {finNumber(data.transMoney)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-b border-gray-100 flex justify-between">
            <label className="w-20 block text-sm font-bold text-gray-700 dark:text-gray-200">
              부채
            </label>
            <div>
              <ul>
                {category.IN2.map((data, index) => (
                  <li key={index} className="flex justify-between">
                    <label className="text-right">{data.categoryName}</label>
                    <div className="w-24 text-right">
                      {finNumber(data.transMoney)}
                    </div>
                  </li>
                ))}
                {category.OUT2.map((data, index) => (
                  <li key={index} className="flex justify-between">
                    {" "}
                    <label className="text-right">{data.categoryName}</label>
                    <div className="w-24 text-right">
                      {finNumber(data.transMoney)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-b border-gray-100 flex justify-between">
            <label className="w-20 block text-sm font-bold text-gray-700 dark:text-gray-200">
              자본
            </label>
            <div>
              <ul>
                <li className="flex justify-between">
                  <label></label>
                  <div className="w-32 text-right"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
