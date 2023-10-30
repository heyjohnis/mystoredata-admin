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
  const [form, setForm] = useState<SearchProps | null>(null);
  const [assets, setAssts] = useState<FinItemProps[]>([]);
  const [transMoneylogs, setTransMoneyLogs] = useState<TransMoneyProps[]>([]);
  const [asset, setAsset] = useState<TransMoneyProps | null>(null);

  useEffect(() => {
    getTradeCorpList();
  }, [form]);

  const getTradeCorpList = () => {
    POST(`asset/list`, form).then((res: any) => {
      console.log({res});
      setAssts(res.data);
    });
  };

  const getLogs = (asset: string, userId: string) => {
    POST(`trans/asset-log`, {userId, asset}).then((res: any) => {
      console.log({res});
      setTransMoneyLogs(res.data);
    });
  };

  return (
    <>
      <Notification />
      <SectionTitle title="자산 Info" subtitle="자산 정보" />
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
              {assets &&
                assets.map((asset, i) => (
                  <tr
                    key={i}
                    className={`${
                      !asset.useYn && "line-through text-gray-400"
                    } cursor-pointer`}
                    onClick={() => getLogs(asset._id, asset.userId)}>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {asset.corpNum} {asset.corpName} ({asset.userId})
                    </td>

                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {asset.finItemCode}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {asset.finItemName}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {asset.finName}
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
