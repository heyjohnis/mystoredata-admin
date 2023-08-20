import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";
import {BankCode, CardCode} from "data/commonCode";

import {useEffect, useState} from "react";
import {GET} from "utils/restApi";
import {CardLogProps} from "model/cardLog";
import {TransMoneyProps} from "model/TransMoney";

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
    name: "계좌/카드번호",
    key: "CardNum",
  },
  {
    name: "거래금액",
    key: "Withdraw",
  },
  {
    name: "통장내역",
    key: "Deposit",
  },
  {
    name: "카드내역",
    key: "TransDT",
  },
  {
    name: "결제결과",
    key: "TransRemark",
  },
  {
    name: "결제방법",
    key: "TransRemark",
  },
  {
    name: "거래일시",
    key: "TransRemark",
  },
];

const Index: React.FC = () => {
  const [logs, setLogs] = useState<TransMoneyProps[]>([]);

  useEffect(() => {
    getCardLogs();
  }, []);

  const getCardLogs = () => {
    GET("trans/log").then((res: any) => {
      console.log({res});
      setLogs(res.data.data);
    });
  };

  return (
    <>
      <Notification />
      <SectionTitle title="merged data" subtitle="거래내역취합" />
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
                    {log.transDate.toString().substring(0, 10)}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.corpNum} ({log.corpName})
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.bank && `[${BankCode[log.bank]}]`}
                    {log.bankAccountNum}{" "}
                    {log.cardCompany && `[${CardCode[log.cardCompany]}]`}
                    {log.cardNum}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-right">
                    {log.transMoney.toLocaleString("ko-KR") || "-"}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {`${log.transRemark || ""} ${log.transType ? "|" : ""} ${
                      log.transType || ""
                    } ${log.transOffice ? "|" : ""} ${log.transOffice || ""} `}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {`${log.useStoreBizType || ""} ${
                      log.useStoreName ? "|" : ""
                    } ${log.useStoreName || ""}`}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.cardApprovalType}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.paymentPlan}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.transDate.toString().substring(0, 19)}
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
