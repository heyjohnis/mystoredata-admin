import {useEffect, useState} from "react";

import {TransMoneyProps} from "@/model/TransMoney";
import {ClassCategoryProps} from "@/model/ClassCategoryProps";
import {SearchProps} from "@/model/SearchForm";

import {useCategoryFinClass} from "@/hooks/useCategoryFinClass";
import {useFinStatusData} from "@/hooks/useFinStatusData";
import {useTransLogs} from "@/hooks/useTransLog";
import {dateChange} from "@/utils/date";
import {isEmptyForm} from "@/utils/form";
import {POST} from "@/utils/restApi";

import FinClassStatus from "@/components/fin-status/FinClassStatus";
import {TaxLogProps} from "@/model/TaxLog";
import {finNumber} from "@/utils/finNumber";
import {DateSelector} from "../common/DateSelector";
import FinStatusTradeKind from "./FinStatusTradeKind";
import {ModalTradeCategoryItems} from "./ModalTradeCategoryItems";
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

type CategoryProps = {
  finClassCode?: string;
  category?: string;
  categoryName?: string;
  transMoney?: number;
};

export type PopupProps = {
  category?: CategoryProps;
  logs?: TransMoneyProps[];
};

export function TradeStatus() {
  const [form, setForm] = useState<SearchProps>(initForm);
  const [finAmount, setFinAmount] = useState<FinAmount>(initFinAmount);
  const [logs, setLogs] = useState<TransMoneyProps[]>([]);
  const [category, setCategory] = useState<ClassCategoryProps>(initCategory);
  const [finData, setFinData] = useState<TransMoneyProps[]>([]);
  const [tradeKind, setTradeKind] = useState<string>("");
  const [accountAmount, setAccountAmount] = useState<assetProps[]>([]);
  const [popupData, setPopupData] = useState<PopupProps>({});
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

  const getTransData = ({
    finClassCode,
    category,
    categoryName,
    transMoney,
  }: CategoryProps) => {
    POST(`/trans/log`, {
      ...form,
      finClassCodes: finClassCode,
      useYn: true,
      category,
    }).then((res: any) => {
      console.log("transdata: ", res?.data);
      setPopupData({
        category: {finClassCode, category, categoryName, transMoney},
        logs: res?.data,
      });
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

  const closedModal = (isUpdated = false) => {
    console.log("closedModal");
  };

  return (
    <>
      <div className="sticky top-0 p-5 m-0 bg-white ">
        <h1 className="w-[60%] text-center m-auto mb-2 text-2xl">
          {form.displayDate}
        </h1>
        <DateSelector form={form} setForm={setForm} />
      </div>
      <div className="mt-5 p-5 pt-0">
        <h2 className="w-full text-lg font-bold mt-5 mb-2">거래분류</h2>
        <div className="w-100 p-6 pb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800 max-h-80 overflow-y-auto">
          <FinClassStatus finAmount={finAmount} getTransData={getTransData} />
        </div>

        <h2 className="w-full text-lg font-bold mt-5 mb-2">제무재표</h2>
        <FinStatusTradeKind
          finAmount={finAmount}
          category={category}
          getTransData={getTransData}
          tradeKind={form?.tradeKind}
          inOutAccount={accountAmount}
        />
      </div>
      <ModalTradeCategoryItems
        popupData={popupData}
        closedModal={closedModal}
      />
    </>
  );
}
