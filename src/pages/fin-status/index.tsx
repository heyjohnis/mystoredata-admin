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

const Index: React.FC = () => {
  const [form, setForm] = useState<SearchProps>();
  const [finAmount, setFinAmount] = useState<FinAmount>(initFinAmount);
  const [logs, setLogs] = useState<TransMoneyProps[]>([]);
  const [asset, setAsset] = useState<TransMoneyProps | null>(null);

  useEffect(() => {
    if (form?.userId && form?.fromAt && form.fromAt) getTransData();
  }, [form]);

  const getTransData = () => {
    POST(`trans/money`, form)
      .then((res: any) => {
        console.log("trans-data: ", res.data);
        setLogs(res.data);
      })
      .catch((err: any) => {});
  };
  useEffect(() => {
    if (form?.userId && form?.fromAt && form.fromAt) getFinStatusData();
  }, [form]);

  const getFinStatusData = () => {
    POST(`fin-status/amount`, form)
      .then((res: any) => {
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
      })
      .catch((err: any) => {});
  };

  const getFinClassData = (finClassCode: string) => {
    POST(`trans/log`, {...form, finClassCode}).then((res: any) => {
      console.log("transdata: ", res.data);
      setLogs(res.data);
    });
  };

  const closedModal = (isUpdated = false) => {
    setAsset(null);
    if (isUpdated) {
      getFinStatusData();
    }
    console.log("closedModal");
  };

  return (
    <>
      <SectionTitle title="Financial Status" subtitle="재정상태" />
      <Widget>
        <SearchForm form={form} handleChange={setForm} />
        <div className="w-full p-4 mt-4 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <div className="flex justify-between">
            <div
              className="flex justify-center cursor-pointer"
              onClick={() => getFinClassData("IN1")}>
              <div>번것(수익+)</div>
              <div>{finAmount.IN1.toLocaleString()}</div>
            </div>
            <div className="bg-gray w-2"></div>
            <div
              className="flex justify-normal cursor-pointer"
              onClick={() => getFinClassData("OUT1")}>
              <div>쓴것(비용+)</div>
              <div>{(finAmount.OUT1 * -1).toLocaleString()}</div>
            </div>
          </div>
          <div className="flex justify-between">
            <div
              className="flex justify-center cursor-pointer"
              onClick={() => getFinClassData("IN2")}>
              <div>빌린것(부채+)</div>
              <div>{finAmount.IN2.toLocaleString()}</div>
            </div>
            <div className="bg-gray w-2"></div>
            <div
              className="flex justify-normal cursor-pointer"
              onClick={() => getFinClassData("OUT2")}>
              <div>갚은것(부채-)</div>
              <div>{(finAmount.OUT2 * -1).toLocaleString()}</div>
            </div>
          </div>
          <div className="flex justify-between">
            <div
              className="flex justify-center cursor-pointer"
              onClick={() => getFinClassData("IN3")}>
              <div>나머지(자산-)</div>
              <div>{finAmount.IN3.toLocaleString()}</div>
            </div>
            <div className="bg-gray w-2"></div>
            <div
              className="flex justify-normal cursor-pointer"
              onClick={() => getFinClassData("OUT3")}>
              <div>나머지(자산+)</div>
              <div>{(finAmount.OUT3 * -1).toLocaleString()}</div>
            </div>
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
