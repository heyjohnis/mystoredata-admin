import {useEffect, useState} from "react";
import {POST} from "utils/restApi";
import {TaxLogProps} from "model/TaxLog";
import SearchForm from "components/SearchForm";
import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";
import {Badge} from "components/badges";
import {SearchProps} from "model/SearchForm";
import TaxLog from "components/tax/TaxLog";
import TransMoneyLog from "components/trans-money/TransMoneyLog";
import {TransMoneyProps} from "model/TransMoney";
import {EmployeeProps} from "model/Employee";
import {DebtProps} from "model/Debt";
const fields: Record<string, string>[] = [
  {
    name: "사용자",
    key: "userId",
  },
  {
    name: "코드",
    key: "tradeType",
  },
  {
    name: "카테고리",
    key: "debtName",
  },
  {
    name: "빚이름",
    key: "debtName",
  },
];

const Index: React.FC = () => {
  const [form, setForm] = useState<SearchProps | null>(null);
  const [debts, setDebts] = useState<DebtProps[]>([]);
  const [transMoneylogs, setTransMoneyLogs] = useState<TransMoneyProps[]>([]);
  const [asset, setAsset] = useState<TransMoneyProps | null>(null);

  useEffect(() => {
    getTradeCorpList();
  }, [form]);

  const getTradeCorpList = () => {
    POST(`debt/list`, form).then((res: any) => {
      console.log({res});
      setDebts(res.data);
    });
  };

  const getLogs = (debt: string, userId: string) => {
    POST(`trans/debt-log`, {userId, employee}).then((res: any) => {
      console.log({res});
      setTransMoneyLogs(res.data);
    });
  };

  return (
    <>
      <Notification />
      <SectionTitle title="Debt Info" subtitle="빚 정보" />
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
              {debts &&
                debts.map((debt, i) => (
                  <tr
                    key={i}
                    className={`${
                      !debt.useYn && "line-through text-gray-400"
                    } cursor-pointer`}
                    onClick={() => getLogs(debt._id, debt.userId)}>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {debt.corpNum} {debt.corpName}({debt.userId})
                    </td>

                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {debt.debtTypeCode}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {debt.debtTypeName}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {debt.debtName}
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
