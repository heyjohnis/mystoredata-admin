import {useEffect, useState} from "react";
import {POST} from "utils/restApi";
import SearchForm from "components/SearchForm";
import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";
import {SearchProps} from "model/SearchForm";
import TransMoneyLog from "components/trans-money/TransMoneyLog";
import {TransMoneyProps} from "model/TransMoney";
import {FinItemProps} from "model/FinItemProps";
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
    name: "부채이름",
    key: "debtName",
  },
];

const Index: React.FC = () => {
  const [form, setForm] = useState<SearchProps>({});
  const [creditCards, setCreditCards] = useState<FinItemProps[]>([]);
  const [cardLogs, setCardLogs] = useState<TransMoneyProps[]>([]);
  const [cashedLogs, setCashedLogs] = useState<TransMoneyProps[]>([]);
  const [asset, setAsset] = useState<TransMoneyProps | null>(null);

  useEffect(() => {
    getTradeCorpList();
    getCardLogs();
    getPayableLogs();
  }, [form]);

  const getTradeCorpList = () => {
    POST(`credit-card/list`, form).then((res: any) => {
      console.log({res});
      setCreditCards(res.data);
    });
  };

  const getCardLogs = () => {
    POST(`trans/credit-log`, form).then((res: any) => {
      console.log({res});
      setCardLogs(res.data);
    });
  };

  const getPayableLogs = () => {
    POST(`credit-card/cashed`, form).then((res: any) => {
      console.log({res});
      setCashedLogs(res.data);
    });
  };

  return (
    <>
      <Notification />
      <SectionTitle title="Debt Info" subtitle="부채 정보" />
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
              {creditCards &&
                creditCards.map((item, i) => (
                  <tr
                    key={i}
                    className={`${
                      !item.useYn && "line-through text-gray-400"
                    } cursor-pointer`}>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {item.corpNum} {item.corpName} ({item.userId})
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {item.finItemCode}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {item.finItemName}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {item.finName}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Widget>
      <Widget>
        <h3 className="m-2 text-lg font-bold	">카드대금결제</h3>
        <TransMoneyLog logs={cashedLogs} setData={setAsset} />
      </Widget>
      <Widget>
        <h3 className="m-2 text-lg font-bold	">카드사용내역</h3>
        <TransMoneyLog logs={cardLogs} setData={setAsset} />
      </Widget>
    </>
  );
};
export default Index;
