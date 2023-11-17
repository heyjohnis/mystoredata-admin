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

const initForm: SearchProps = {
  userId: "bethelean",
  fromAt: dateChange(new Date(), -1).toISOString().slice(0, 10),
  toAt: dateChange(new Date(), -1).toISOString().slice(0, 10),
};

const Index: React.FC = () => {
  const [form, setForm] = useState(initForm);

  const [logs, setLogs] = useState([]);
  const [asset, setAsset] = useState<TransMoneyProps | null>(null);

  const getTransLogs = () => {
    POST(`trans/log`, form).then((res: any) => {
      setLogs(res.data);
    });
  };
  useEffect(() => {
    getTransLogs();
  }, [form]);

  return (
    <>
      <Notification />
      <SectionTitle title="Overview" subtitle="Dashboard" />
      <Widget>
        <SearchForm form={form} handleChange={setForm} />
        <TransMoneyLog logs={logs} setData={setAsset} reload={getTransLogs} />
      </Widget>
    </>
  );
};
export default Index;
