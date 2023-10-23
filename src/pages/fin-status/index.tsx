import {FiSlack, FiGithub} from "react-icons/fi";
import SectionTitle from "components/section-title";
import Faq from "components/faq";
import Features from "components/support/features";
import Search from "components/support/search";
import Title from "components/support/title";
import Widget1 from "components/support/widget-1";
import SearchForm from "components/SearchForm";
import {useEffect, useState} from "react";
import Widget from "components/widget";
import {TransMoneyProps} from "model/TransMoney";
import {POST} from "utils/restApi";
import {SearchProps} from "model/SearchForm";
import TransMoneyLog from "components/trans-money/TransMoneyLog";
import ModalTransMoney from "components/trans-money/ModalTransMoney";
import {set} from "nprogress";
import FinClassStatus from "components/fin-status/FinClassStatus";
import FinSimpleStatus from "components/fin-status/FinSimpleStatus";
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
  IN4: 0,
  OUT1: 0,
  OUT2: 0,
  OUT3: 0,
  OUT4: 0,
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

const Index: React.FC = () => {
  const [form, setForm] = useState<SearchProps>();
  const [finAmount, setFinAmount] = useState<FinAmount>(initFinAmount);
  const [taxAmount, setTaxAmount] = useState<FinAmount>(initFinTaxAmount);
  const [accountAmount, setAccountAmount] = useState<assetProps[]>([]);
  const [logs, setLogs] = useState<TransMoneyProps[]>([]);
  const [asset, setAsset] = useState<TransMoneyProps[] | null>(null);
  const [debt, setDebt] = useState<TransMoneyProps[] | null>(null);
  const [finClassCode, setFinClassCode] = useState<string>("");

  useEffect(() => {
    if (form?.userId && form?.fromAt && form.fromAt) {
      getFinStatusData();
      getFinTaxData();
      getFinAccountData();
      getAssetData();
      getDebtData();
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

  const getFinTaxData = () => {
    POST(`fin-status/tax`, form).then((res: any) => {
      console.log("fin-tax: ", res.data);
      const taxAmounts =
        res?.data.length > 0
          ? res?.data?.forEach((item: any) => {
              if (item._id === 1) {
                setTaxAmount({
                  ...taxAmount,
                  IN_TAX: item?.tax || 0,
                  IN_AMT: item?.amount || 0,
                  IN_TOTAL: item?.total || 0,
                });
              } else {
                setTaxAmount({
                  ...taxAmount,
                  OUT_TAX: item?.tax || 0,
                  OUT_AMT: item?.amount || 0,
                  OUT_TOTAL: item?.total || 0,
                });
              }
            })
          : initFinTaxAmount;
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

  const getFinClassData = (code: string) => {
    setFinClassCode(code);
    POST(`trans/log`, {...form, finClassCode: code}).then((res: any) => {
      console.log("transdata: ", res.data);
      setLogs(res.data);
    });
  };

  const closedModal = (isUpdated = false) => {
    setAsset(null);
    if (isUpdated) {
      getFinClassData(finClassCode);
    }
    console.log("closedModal");
  };

  return (
    <>
      <SectionTitle title="Financial Status" subtitle="재정상태" />
      <Widget>
        <SearchForm form={form} handleChange={setForm} />
        <div className="flex justify-between">
          <div className="w-100 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-bold mb-3">거래분류</h2>
            <FinClassStatus
              finAmount={finAmount}
              getFinClassData={getFinClassData}
            />
          </div>
          <div className="w-1/3 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-bold mb-3">Daily 재무제표</h2>
            <FinDailyStatus
              finAmount={finAmount}
              taxAmount={taxAmount}
              accountAmount={accountAmount}
            />
          </div>
          <div className="w-1/3 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-bold mb-3">간편재무상태표</h2>
            <FinSimpleStatus
              finAmount={finAmount}
              taxAmount={taxAmount}
              accountAmount={accountAmount}
            />
          </div>
        </div>
      </Widget>
      <Widget>
        <TransMoneyLog logs={logs} setData={setAsset} />
        <ModalTransMoney asset={asset} closedModal={closedModal} />
      </Widget>
    </>
  );
};
export default Index;
