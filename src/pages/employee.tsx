import {useEffect, useState} from "react";
import {POST} from "@/utils/restApi";
import {TaxLogProps} from "@/model/TaxLog";
import SearchForm from "@/components/SearchForm";
import SectionTitle from "@/components/dashboard/section-title";
import Notification from "@/components/dashboard/notification";
import Widget from "@/components/widget";
import {Badge} from "@/components/badges";
import {SearchProps} from "@/model/SearchForm";
import TaxLog from "@/components/tax/TaxLog";
import TransMoneyLog from "@/components/trans-money/TransMoneyLog";
import {TransMoneyProps} from "@/model/TransMoney";
import {EmployeeProps} from "@/model/Employee";
const fields: Record<string, string>[] = [
  {
    name: "사용자",
    key: "userId",
  },
  {
    name: "직원명",
    key: "tradeType",
  },
  {
    name: "최근급여",
    key: "corpNum",
  },
];

const Index: React.FC = () => {
  const [form, setForm] = useState<SearchProps>({});
  const [emps, setEmps] = useState<EmployeeProps[]>([]);
  const [transMoneylogs, setTransMoneyLogs] = useState<TransMoneyProps[]>([]);
  const [asset, setAsset] = useState<TransMoneyProps | null>(null);

  useEffect(() => {
    getTradeCorpList();
  }, [form]);

  const getTradeCorpList = () => {
    POST(`emp/list`, form).then((res: any) => {
      console.log({res});
      setEmps(res.data);
    });
  };

  const getLogs = (employee: string, userId: string) => {
    POST(`trans/emp-log`, {userId, employee}).then((res: any) => {
      console.log({res});
      setTransMoneyLogs(res.data);
    });
  };

  return (
    <>
      <Notification />
      <SectionTitle title="Employee Info" subtitle="직원 정보" />
      <Widget>
        <SearchForm form={form} handleChange={setForm} />
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                {fields.map((field, i) => (
                  <th
                    key={i}
                    className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase border-b border-gray-100 dark:border-gray-800 leading-4">
                    {field.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {emps &&
                emps.map((emp, i) => (
                  <tr
                    key={i}
                    className={`${
                      !emp.useYn && "line-through text-gray-400"
                    } cursor-pointer`}
                    onClick={() => getLogs(emp._id, emp.userId)}>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {emp.corpNum} {emp.corpName}({emp.userId})
                    </td>

                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {emp.empName}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Widget>
      <Widget>
        <h3 className="m-2 text-lg font-bold	">거래내역</h3>
        <TransMoneyLog logs={transMoneylogs} setData={setAsset} />
      </Widget>
    </>
  );
};
export default Index;
