import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";
import {Input} from "components/forms/input";
import {InputWrapper} from "components/forms/input-wrapper";
import {Label} from "components/forms/label";

import {useEffect, useState} from "react";
import {GET} from "utils/restApi";
import {AccountLogProps} from "model/accountLog";
import {BankCode} from "data/commonCode";

const fields: Record<string, string>[] = [
  {
    name: "사용자",
    key: "userId",
  },
  {
    name: "사업자",
    key: "CorpNum",
  },
  {
    name: "계좌번호",
    key: "BankAccountNum",
  },
  {
    name: "입금",
    key: "Deposit",
  },
  {
    name: "출금",
    key: "Withdraw",
  },
  {
    name: "키워드",
    key: "keyword",
  },
  {
    name: "거래적요",
    key: "TransRemark",
  },
  {
    name: "거래일시",
    key: "TransDT",
  },
  {
    name: "잔액",
    key: "Balance",
  },
];

const Index: React.FC = () => {
  const [logs, setLogs] = useState<AccountLogProps[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [corpNum, setCorpNum] = useState<string>("");
  useEffect(() => {
    getAccountLogs();
  }, [userId, corpNum]);

  const getAccountLogs = () => {
    GET(`account/log?corpNum=${corpNum}&userId=${userId}`).then((res: any) => {
      console.log({res});
      setLogs(res.data);
    });
  };

  return (
    <>
      <Notification />
      <SectionTitle title="account raw data" subtitle="계좌데이터" />
      <Widget>
        <div className="flex">
          <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
            <Label>사업자번호</Label>
            <Input
              name="corpNum"
              type="text"
              value={corpNum}
              onChange={(e) => setCorpNum(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
            <Label>사용자ID</Label>
            <Input
              name="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </InputWrapper>
        </div>
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
                    {log.TransDT.substring(0, 8)}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.CorpNum} ({log.CorpName})
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    [{BankCode[log.bank]}]{log.BankAccountNum}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-right">
                    {parseInt(log.Deposit).toLocaleString("ko-KR") || "-"}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-right">
                    {parseInt(log.Withdraw).toLocaleString("ko-KR") || "-"}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.keyword.join(", ")}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.TransRemark}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.TransDT}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-right">
                    {parseInt(log.Balance).toLocaleString("ko-KR") || "-"}
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
