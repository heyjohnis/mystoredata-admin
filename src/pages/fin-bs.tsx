import SectionTitle from "components/section-title";
import SearchForm from "components/SearchForm";
import {useEffect, useState} from "react";
import Widget from "components/widget";
import {TransMoneyProps} from "model/TransMoney";
import {POST} from "utils/restApi";
import {SearchProps} from "model/SearchForm";
import TransMoneyLog from "components/trans-money/TransMoneyLog";
import FinClassStatus from "components/fin-status/FinClassStatus";
import FinDailyStatus from "components/fin-status/FinDailyStatus";

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

const initForm: SearchProps = {
  userId: "bethelean",
  corpNum: "",
  fromAt: new Date("2021-01-01").toISOString().slice(0, 10),
  toAt: new Date().toISOString().slice(0, 10),
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

const Index: React.FC = () => {
  const [form, setForm] = useState<SearchProps>();
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

  useEffect(() => {
    if (form?.userId && form?.fromAt && form.fromAt) {
      getFinStatusData();
      getFinAccountData();
      getAssetData();
      getDebtData();
      getCategroyByClass();
    }
  }, [form]);

  const getFinStatusData = () => {
    POST(`fin-status/amount`, form).then((res: any) => {
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
    POST(`fin-status/account`, form).then((res: any) => {
      console.log("fin-account: ", res.data);
      setAccountAmount([...res.data]);
    });
  };

  const getAssetData = () => {
    POST(`fin-status/asset`, form).then((res: any) => {
      console.log("fin-asset: ", res.data);
      setAsset([...res.data]);
    });
  };

  const getDebtData = () => {
    POST(`fin-status/debt`, form).then((res: any) => {
      console.log("fin-debt: ", res.data);
      setDebt([...res.data]);
    });
  };

  const getTransData = (code: string, category = "") => {
    setFinClassCode(code);
    POST(`trans/log`, {
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
    POST(`trans/class-category`, form).then((res: any) => {
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

  const closedModal = (isUpdated = false) => {
    setAsset(null);
    if (isUpdated) {
      getTransData(finClassCode);
    }
    console.log("closedModal");
  };

  return (
    <>
      <SectionTitle title="Financial Status" subtitle="재무현황표" />
      <Widget>
        <SearchForm form={form} handleChange={setForm} />
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
        </div>
      </Widget>
      <Widget>
        <TransMoneyLog logs={logs} setData={setAsset} />
      </Widget>
    </>
  );
};
export default Index;
