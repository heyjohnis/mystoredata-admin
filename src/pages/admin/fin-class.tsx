import {FiSlack, FiGithub} from "react-icons/fi";
import SectionTitle from "@/components/ui/section-title";
import Faq from "@/components/sample/faq";
import Features from "@/components/sample/support/features";
import Search from "@/components/sample/support/search";
import Title from "@/components/sample/support/title";
import Widget1 from "@/components/sample/support/widget-1";
import SearchForm from "@/components/SearchForm";
import {useEffect, useState} from "react";
import Widget from "@/components/ui/widget";
import {TransMoneyProps} from "@/model/TransMoney";
import {POST} from "@/utils/restApi";
import {SearchProps} from "@/model/SearchForm";
import TransMoneyLog from "@/components/trans-money/TransMoneyLog";
import ModalTransMoney from "@/components/trans-money/ModalTransMoney";
import {set} from "nprogress";
import FinClassStatus from "@/components/fin-status/FinClassStatus";
import FinSimpleStatus from "@/components/fin-status/FinSimpleStatus";
import FinDailyStatus from "@/components/fin-status/FinDailyStatus";

interface FinAmount {
  [key: string]: number;
}

type dataProps = {
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

type categoryProps = {
  finClassCode: string;
  category: string;
  categoryNames: string;
  transMoney: number;
};

type classCategoryProps = {
  IN1: Array<categoryProps>;
  IN2: Array<categoryProps>;
  IN3: Array<categoryProps>;
  OUT1: Array<categoryProps>;
  OUT2: Array<categoryProps>;
  OUT3: Array<categoryProps>;
};

const tabs = [
  {index: 0, title: "전체", active: true, tradeKind: ""},
  {index: 1, title: "통장", active: false, tradeKind: "CASH"},
  {index: 2, title: "카드", active: false, tradeKind: "CREDIT"},
  {index: 3, title: "세금계산서", active: false, tradeKind: "BILL"},
];

const Index: React.FC = () => {
  const [form, setForm] = useState<SearchProps>({});
  const [finAmount, setFinAmount] = useState<FinAmount>(initFinAmount);
  const [taxAmount, setTaxAmount] = useState<FinAmount>(initFinTaxAmount);
  const [accountAmount, setAccountAmount] = useState<assetProps[]>([]);
  const [logs, setLogs] = useState<TransMoneyProps[]>([]);
  const [asset, setAsset] = useState<TransMoneyProps[] | null>(null);
  const [debt, setDebt] = useState<TransMoneyProps[] | null>(null);
  const [finClassCode, setFinClassCode] = useState<string>("");
  const [category, setCategory] = useState<classCategoryProps>({
    IN1: [],
    IN2: [],
    IN3: [],
    OUT1: [],
    OUT2: [],
    OUT3: [],
  });
  const [openTab, setOpenTab] = useState<number>(0);

  useEffect(() => {
    console.log("form: ", form);
    if (form?.userId && form?.fromAt && form.fromAt) {
      getFinStatusData();
      getFinAccountData();
      // getAssetData();
      // getDebtData();
      getCategroyByClass();
    }
  }, [form]);

  const getFinStatusData = () => {
    POST(`/fin-status/amount`, form).then((res: any) => {
      console.log("fin-status: ", res.data);
      const finAmounts =
        res?.data.length > 0
          ? res?.data?.reduce(
              (amts: FinAmount, amt: dataProps) => {
                amts[amt._id] = amt?.amount || 0;
                return amts;
              },
              {...initFinAmount} as FinAmount
            )
          : initFinAmount;
      console.log("setFinAmount: ", finAmounts);
      setFinAmount(finAmounts);
    });
  };

  const getFinAccountData = () => {
    POST(`/fin-status/account`, form).then((res: any) => {
      console.log("fin-account: ", res.data);
      setAccountAmount([...res.data]);
    });
  };

  const getAssetData = () => {
    POST(`/fin-status/asset`, form).then((res: any) => {
      console.log("fin-asset: ", res.data);
      setAsset([...res.data]);
    });
  };

  const getDebtData = () => {
    POST(`/fin-status/debt`, form).then((res: any) => {
      console.log("fin-debt: ", res.data);
      setDebt([...res.data]);
    });
  };

  const getTransData = (code: string, category = "") => {
    setFinClassCode(code);
    POST(`/trans/log`, {
      ...form,
      finClassCode: code,
      useKind: "BIZ",
      useYn: true,
      category,
    }).then((res: any) => {
      console.log("transdata: ", res.data);
      setLogs(res.data);
    });
  };

  const getCategroyByClass = () => {
    POST(`/trans/class-category`, form).then((res: any) => {
      console.log("getCategroyByClass: ", res.data);
      setCategroyByClass(res.data);
    });
  };

  const setCategroyByClass = (cate: categoryProps[]) => {
    type classCategoryProps = {
      [key: string]: categoryProps[];
    };
    const classCategory: classCategoryProps = {};
    cate.forEach((category) => {
      if (!classCategory[category.finClassCode]) {
        classCategory[category.finClassCode] = [];
      }
      classCategory[category.finClassCode].push(category);
    });
    console.log("classCategory: ", classCategory);
    setCategory((prevCategory) => ({...prevCategory, ...classCategory}));
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
            <h2 className="text-lg font-bold mb-3">재무제표</h2>
            <FinDailyStatus
              finAmount={finAmount}
              category={category}
              getTransData={getTransData}
            />
          </div>
          {/* <div className="w-1/3 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-bold mb-3">간편재무상태표</h2>
            <FinSimpleStatus
              finAmount={finAmount}
              taxAmount={taxAmount}
              accountAmount={accountAmount}
            />
          </div> */}
        </div>
      </Widget>
      <Widget>
        <TransMoneyLog logs={logs} setData={setAsset} />
        {/* <ModalTransMoney asset={asset} closedModal={closedModal} /> */}
      </Widget>
    </>
  );
};
export default Index;
