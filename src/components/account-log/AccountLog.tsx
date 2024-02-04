import {BaroBankCode} from "@/data/commonCode";
import {AccountLogProps} from "model/accountLog";
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
    name: "거래키",
    key: "transRefKey",
  },
  {
    name: "mgtRemark1",
    key: "mgtRemark1",
  },
  {
    name: "mgtRemark1",
    key: "mgtRemark1",
  },
  {
    name: "거래일시",
    key: "TransDT",
  },
  {
    name: "잔액",
    key: "Balance",
  },
  {
    name: "ID",
    key: "_id",
  },
];

type props = {
  logs: AccountLogProps[];
  handleClick: (log: AccountLogProps) => void;
};

export default function AccountLog({logs, handleClick}: props) {
  return (
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
            <tr
              key={i}
              onClick={() => handleClick(log)}
              className="cursor-pointer">
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {new Date(log.transDate).toLocaleDateString("ko-KR")}{" "}
                {new Date(log.transDate).toLocaleTimeString("ko-KR")}{" "}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.corpNum} ({log.corpName})
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                [{BaroBankCode[log.bank]}]{log.bankAccountNum}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-right">
                {parseInt(log.deposit).toLocaleString("ko-KR") || "-"}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-right">
                {parseInt(log.withdraw).toLocaleString("ko-KR") || "-"}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.keyword.join(", ")}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.transRemark}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.transRefKey}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.mgtRemark1}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.mgtRemark2}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.transDT}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-right">
                {parseInt(log.balance).toLocaleString("ko-KR") || "-"}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log._id}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
