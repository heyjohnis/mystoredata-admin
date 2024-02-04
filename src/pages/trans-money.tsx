import {useEffect, useState} from "react";
import {BaroBankCode, CardCode, UseKind} from "@/data/commonCode";
import {POST, PUT} from "@/utils/restApi";
import {TransMoneyProps} from "@/model/TransMoney";
import SearchForm from "@/components/SearchForm";
import SectionTitle from "@/components/dashboard/section-title";
import Notification from "@/components/dashboard/notification";
import Widget from "@/components/widget";

import ModalTransMoney from "@/components/trans-money/ModalTransMoney";
import {SearchProps} from "@/model/SearchForm";
import TransMoneyLog from "@/components/trans-money/TransMoneyLog";

const Index: React.FC = () => {
  const [logs, setLogs] = useState<TransMoneyProps[]>([]);
  const [asset, setAsset] = useState<TransMoneyProps | null>(null);
  const [form, setForm] = useState<SearchProps>({});
  useEffect(() => {
    getTransLogs();
  }, [form]);

  const getTransLogs = () => {
    POST(`/trans/log`, form).then((res: any) => {
      setLogs(res.data);
    });
  };

  const transMerge = () => {
    PUT(`/trans/merge`, {
      corpNum: form?.corpNum,
      userId: form?.userId,
      fromAt: form?.fromAt,
      toAt: form?.toAt,
      category: form?.category,
    }).then((res: any) => {
      console.log({res});
      if (res.data.success) {
        getTransLogs();
        alert("거래내역취합이 완료되었습니다.");
      }
    });
  };

  return (
    <>
      <Notification />
      <SectionTitle title="merged data" subtitle="거래내역취합" />
      <Widget>
        <SearchForm
          form={form}
          handleClick={transMerge}
          handleChange={setForm}
          handleChangeName={"거래내역취합"}
        />
        <TransMoneyLog logs={logs} setData={setAsset} reload={getTransLogs} />
      </Widget>
    </>
  );
};
export default Index;
