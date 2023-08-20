import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";
import {CardCode} from "data/commonCode";

import {useEffect, useState} from "react";
import {GET} from "utils/restApi";
import {CardLogProps} from "model/cardLog";

const fields: Record<string, string>[] = [
  {
    name: "거래일",
    key: "CorpNum",
  },
  {
    name: "사업자",
    key: "CorpNum",
  },
  {
    name: "카드번호",
    key: "CardNum",
  },
  {
    name: "결제금액",
    key: "Withdraw",
  },
  {
    name: "세금/화폐",
    key: "Deposit",
  },
  {
    name: "결제결과",
    key: "TransDT",
  },
  {
    name: "결제방식",
    key: "TransRemark",
  },
  {
    name: "사업자유형",
    key: "TransRemark",
  },
  {
    name: "업체명",
    key: "TransRemark",
  },
  {
    name: "거래일시",
    key: "TransRemark",
  },
];

const Index: React.FC = () => {
  const [logs, setLogs] = useState<CardLogProps[]>([]);

  useEffect(() => {
    getCardLogs();
  }, []);

  const getCardLogs = () => {
    GET("card/log").then((res: any) => {
      console.log({res});
      setLogs(res.data);
    });
  };

  return (
    <>
      <Notification />
      <SectionTitle title="card raw data" subtitle="카드데이터" />
      <Widget>
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
              {logs.map((log, i) => (
                <tr key={i}>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.UseDT.substring(0, 8)}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.CorpNum} ({log.CorpName})
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    [{CardCode[log.cardCompany]}] {log.CardNum}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-right">
                    {parseInt(log.CardApprovalCost).toLocaleString("ko-KR") ||
                      "-"}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-center">
                    ({parseInt(log.Tax).toLocaleString("ko-KR") || "-"},{" "}
                    {log.Currency})
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.CardApprovalType}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.PaymentPlan}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.UseStoreBizType}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.UseStoreName}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.UseDT}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Widget>
    </>
  );
};
export default Index;
