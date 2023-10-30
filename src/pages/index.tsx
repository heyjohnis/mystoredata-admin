import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";
import SearchForm from "components/SearchForm";
import FinDailyStatus from "components/fin-status/FinDailyStatus";
import FinClassStatus from "components/fin-status/FinClassStatus";
import {useState} from "react";

const Index: React.FC = () => {
  const [form, setForm] = useState({});
  const [finAmount, setFinAmount] = useState({});
  const [category, setCategory] = useState({});
  const [logs, setLogs] = useState([]);

  return (
    <>
      <Notification />
      <SectionTitle title="Overview" subtitle="Dashboard" />
      {/* <Widget>
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
      </Widget> */}
    </>
  );
};
export default Index;
