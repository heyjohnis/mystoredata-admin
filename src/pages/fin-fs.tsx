import SectionTitle from "components/section-title";
import SearchForm from "components/SearchForm";
import {useEffect, useState} from "react";
import Widget from "components/widget";
import {TransMoneyProps} from "model/TransMoney";
import {POST} from "utils/restApi";
import {SearchProps} from "model/SearchForm";
import TransMoneyLog from "components/trans-money/TransMoneyLog";
import FinClassStatus from "components/fin-status/FinClassStatus";
import FinStatusTradeKind from "components/fin-status/FinStatusTradeKind";
import {CategoryProps, ClassCategoryProps} from "model/ClassCategoryProps";
import {useCategoryFinClass} from "hooks/useCategoryFinClass";
import {isEmptyForm} from "utils/form";
import {useFinStatusData} from "hooks/useFinStatusData";

interface FinAmount {
  [key: string]: number;
}

type DataProps = {
  _id: string;
  amount: number;
};

const initFinAmount: FinAmount = {
  IN1: 0,
  IN2: 0,
  IN3: 0,
  OUT1: 0,
  OUT2: 0,
  OUT3: 0,
};

const initFinTaxAmount: FinAmount = {
  IN_TAX: 0,
  IN_AMT: 0,
  IN_TOTAL: 0,
  OUT_TAX: 0,
  OUT_AMT: 0,
  OUT_TOTAL: 0,
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

const tabs = [
  {index: 0, title: "전체", active: true, tradeKind: ""},
  {index: 1, title: "통장", active: false, tradeKind: "CASH"},
  {index: 2, title: "체크카드", active: false, tradeKind: "CHECK"},
  {index: 3, title: "신용카드", active: false, tradeKind: "CREDIT"},
  {index: 4, title: "세금계산서", active: false, tradeKind: "BILL"},
];

const Index: React.FC = () => {
  const [form, setForm] = useState<SearchProps>({});
  const [finAmount, setFinAmount] = useState<FinAmount>(initFinAmount);
  const [accountAmount, setAccountAmount] = useState<assetProps[]>([]);
  const [logs, setLogs] = useState<TransMoneyProps[]>([]);
  const [asset, setAsset] = useState<TransMoneyProps[] | null>(null);
  const [finClassCode, setFinClassCode] = useState<string>("");
  const [category, setCategory] = useState<ClassCategoryProps>(initCategory);
  const [openTab, setOpenTab] = useState<number>(0);

  const categoryFinClass = useCategoryFinClass(form);
  const finStatusData = useFinStatusData(form);

  useEffect(() => {
    if (isEmptyForm(form)) return;
  }, [form]);

  useEffect(() => {
    setCategory(categoryFinClass);
  }, [categoryFinClass]);

  useEffect(() => {
    setFinAmount(finStatusData);
  }, [finStatusData]);

  const getTransData = (code: string, category = "") => {
    setFinClassCode(code);
    POST(`trans/log`, {
      ...form,
      finClassCodes: code,
      // useKind: "BIZ",
      useYn: true,
      category,
    }).then((res: any) => {
      console.log("transdata: ", res.data);
      setLogs(res.data);
    });
  };

  return (
    <>
      <SectionTitle title="Financial Status" subtitle="재정상태" />
      <Widget>
        <SearchForm form={form} handleChange={setForm} />
        <div className="flex flex-row overflow-x-auto lg:flex-wrap lg:space-x-1 m-3 mt-6">
          {tabs.map((tab, key) => (
            <div key={key} className="flex-none">
              <button
                onClick={() => {
                  setOpenTab(tab.index);
                  setForm((prev: any) => ({...prev, tradeKind: tab.tradeKind}));
                }}
                className={`font-bold uppercase text-xs p-4 rounded-lg flex flex-row items-center justify-around ${
                  openTab === tab.index
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-white dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-blue-50"
                }`}
                type="button">
                {tab.title}
              </button>
            </div>
          ))}
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
        <TransMoneyLog logs={logs} setData={setAsset} />
      </Widget>
    </>
  );
};
export default Index;
