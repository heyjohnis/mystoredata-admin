import {useEffect, useState} from "react";
import {POST} from "utils/restApi";
import {TaxLogProps} from "model/TaxLog";
import SearchForm from "components/SearchForm";
import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";
import {Badge} from "components/badges";
import {SearchProps} from "model/SearchForm";
import {TradeCorpProps} from "model/TradeCorp";
import TaxLog from "components/tax/TaxLog";
import TransMoneyLog from "components/trans-money/TransMoneyLog";
import {TransMoneyProps} from "model/TransMoney";

const fields: Record<string, string>[] = [
  {
    name: "사용자",
    key: "userId",
  },
  {
    name: "유형",
    key: "tradeType",
  },
  {
    name: "사업자번호",
    key: "corpNum",
  },
  {
    name: "사업자명",
    key: "corpName",
  },
  {
    name: "업종",
    key: "tradeCorpBizType",
  },
  {
    name: "업태",
    key: "tradeCorpBizClass",
  },
];

const Index: React.FC = () => {
  const [form, setForm] = useState<SearchProps>();
  const [corps, setCorps] = useState<TradeCorpProps[]>([]);
  const [taxlogs, setTaxLogs] = useState<TaxLogProps[]>([]);
  const [taxPayedlogs, setTaxPayedLogs] = useState<TaxLogProps[]>([]);
  const [transMoneylogs, setTransMoneyLogs] = useState<TransMoneyProps[]>([]);
  const [asset, setAsset] = useState<TransMoneyProps | null>(null);

  useEffect(() => {
    getTradeCorpList();
  }, [form]);

  const getTradeCorpList = () => {
    POST(`trade-corp/list`, form).then((res: any) => {
      console.log({res});
      setCorps(res.data);
    });
  };

  const getLogs = (tradeCorp: string, userId: string) => {
    POST(`tax/logs`, {userId, tradeCorp}).then((res: any) => {
      console.log({res});
      setTaxLogs(res.data);
    });
    POST(`trans/trade-log`, {userId, tradeCorp}).then((res: any) => {
      console.log({res});
      setTransMoneyLogs(res.data);
    });
  };

  const getTaxPayedLogs = (tradeCorp: string, userId: string) => {
    POST(`tax/payed`, {userId, tradeCorp}).then((res: any) => {
      console.log({res});
      setTaxPayedLogs(res.data);
    });
  };

  return (
    <>
      <Notification />
      <SectionTitle title="Trade Corporation" subtitle="거래처 정보" />
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
              {corps &&
                corps.map((corp, i) => (
                  <tr
                    key={i}
                    className={`${
                      !corp.useYn && "line-through text-gray-400"
                    } cursor-pointer`}
                    onClick={() => getLogs(corp._id, corp.userId)}>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {corp.corpNum} {corp.corpName}({corp.userId})
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      <Badge
                        size={"sm"}
                        color={`text-${
                          corp.tradeTypeCode > 0 ? "red" : "blue"
                        }-400 mr-1`}
                        outlined
                        rounded>
                        {corp.tradeType}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {corp.tradeCorpNum}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {corp.tradeCorpName}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {corp.tradeCorpBizType}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {corp.tradeCorpBizClass}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {corp.tradeRemark}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Widget>
      <Widget>
        <h3 className="m-2 text-lg font-bold	">부가세납부내역</h3>
        <TaxLog logs={taxPayedlogs} />
      </Widget>
      <Widget>
        <h3 className="m-2 text-lg font-bold	">세금계산서 발행 이력</h3>
        <TaxLog logs={taxlogs} />
      </Widget>
      <Widget>
        <h3 className="m-2 text-lg font-bold	">거래내역</h3>
        <TransMoneyLog logs={transMoneylogs} setData={setAsset} />
      </Widget>
    </>
  );
};
export default Index;
