import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";
import SearchForm from "components/SearchForm";
import FinDailyStatus from "components/fin-status/FinDailyStatus";
import FinClassStatus from "components/fin-status/FinClassStatus";
import {useEffect, useState} from "react";
import {POST} from "utils/restApi";
import TransMoneyLog from "components/trans-money/TransMoneyLog";
import {TransMoneyProps} from "model/TransMoney";
import {SearchProps} from "model/SearchForm";
import {dateChange} from "utils/date";
import FinStatusTradeKind from "components/fin-status/FinStatusTradeKind";
import {CategoryProps, ClassCategoryProps} from "model/ClassCategoryProps";

interface FinAmount {
  [key: string]: number;
}

type DataProps = {
  _id: string;
  amount: number;
};

const initForm: SearchProps = {
  userId: "bethelean",
  fromAt: dateChange(new Date(), -1).toISOString().slice(0, 10),
  toAt: dateChange(new Date(), -1).toISOString().slice(0, 10),
};

const initFinAmount: FinAmount = {
  IN1: 0,
  IN2: 0,
  IN3: 0,
  OUT1: 0,
  OUT2: 0,
  OUT3: 0,
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

const Index: React.FC = () => {
  const [form, setForm] = useState(initForm);
  const [finAmount, setFinAmount] = useState<FinAmount>(initFinAmount);
  const [logs, setLogs] = useState([]);
  const [asset, setAsset] = useState<TransMoneyProps | null>(null);
  const [category, setCategory] = useState<ClassCategoryProps>(initCategory);
  const [finClassCode, setFinClassCode] = useState<string>("");
  const [inOutAccount, setInOutAccount] = useState<CategoryProps[]>([]);

  const getTransLogs = () => {
    POST(`trans/log`, form).then((res: any) => {
      res?.data && setLogs(res.data);
    });
  };

  useEffect(() => {
    getTransLogs();
    getTransLogs();
    getFinStatusData();
    getCategroyByClass();
    getInOutAmount();
  }, [form]);

  const getFinStatusData = () => {
    POST(`fin-status/amount`, form).then((res: any) => {
      const finAmounts =
        res?.data.length > 0
          ? res?.data?.reduce(
              (amts: FinAmount, amt: DataProps) => {
                amts[amt._id] = amt?.amount || 0;
                return amts;
              },
              {...initFinAmount} as FinAmount
            )
          : initFinAmount;
      setFinAmount(finAmounts);
    });
  };

  const getTransData = (code: string, category = "") => {
    setFinClassCode(code);
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

  const getInOutAmount = () => {
    POST(`trans/in-out-account`, form).then((res: any) => {
      console.log("getInOutAmount: ", res?.data);
      res?.data && setInOutAccount(res.data);
    });
  };

  const getCategroyByClass = () => {
    POST(`trans/class-category`, form).then((res: any) => {
      console.log("getCategroyByClass: ", res?.data);
      res?.data && setCategroyByClass(res.data);
    });
  };

  // 거래분류에 따른 category 데이터
  const setCategroyByClass = (cate: CategoryProps[]) => {
    const classCategory = JSON.parse(JSON.stringify(initCategory));
    cate.forEach((category) => {
      const finClass = category?.finClassCode;
      if (finClass) classCategory[finClass].push(category);
    });
    const IN_OUT2_ARR = [...classCategory["IN2"], ...classCategory["OUT2"]];
    const IN_OUT3_ARR = [...classCategory["IN3"], ...classCategory["OUT3"]];
    setCategory({
      ...classCategory,
      IN2_OUT2: setInOutKeyArray(IN_OUT2_ARR, "IN2_OUT2"),
      IN3_OUT3: setInOutKeyArray(IN_OUT3_ARR, "IN3_OUT3"),
    });
  };

  const setInOutKeyArray = (arr: CategoryProps[], finClassCode: string) => {
    return arr.reduce((acc: CategoryProps[], cur: CategoryProps) => {
      const hasEl = acc.find((c: CategoryProps) => {
        return c.category === cur.category;
      });
      if (hasEl) {
        hasEl.transMoney += cur.transMoney;
      } else {
        acc.push({
          finClassCode,
          category: cur.category,
          categoryName: cur.categoryName,
          transMoney: cur.transMoney,
        });
      }
      return acc;
    }, []);
  };

  return (
    <>
      <Notification />
      <SectionTitle title="Overview" subtitle="Dashboard" />
      <Widget>
        <SearchForm form={form} handleChange={setForm} />
        <div className="justify-between">
          <div className="w-100 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-bold mb-3">거래분류</h2>
            <FinClassStatus finAmount={finAmount} getTransData={getTransData} />
          </div>
          <h2 className="p-4 pb-0 text-xl font-bold">재무제표</h2>
          <div className="flex w-100 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <div className="w-full">
              <FinStatusTradeKind
                finAmount={finAmount}
                category={category}
                getTransData={getTransData}
                inOutAccount={inOutAccount}
                tradeKind={form?.tradeKind}
              />
            </div>
          </div>
        </div>
        <TransMoneyLog logs={logs} setData={setAsset} reload={getTransLogs} />
      </Widget>
    </>
  );
};
export default Index;
