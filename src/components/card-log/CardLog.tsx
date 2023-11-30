import {CardCode} from "data/commonCode";
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
    name: "키워드",
    key: "keyword",
  },
  {
    name: "세금/화폐",
    key: "tax",
  },
  {
    name: "결제결과",
    key: "cardApprovalType",
  },
  {
    name: "결제방식",
    key: "paymentPlan",
  },
  {
    name: "사업자유형",
    key: "useStoreBizType",
  },
  {
    name: "업체명",
    key: "useStoreName",
  },
  {
    name: "거래일시",
    key: "transDate",
  },
  {
    name: "totalAmount",
    key: "totalAmount",
  },
  {
    name: "installmentMonths",
    key: "installmentMonths",
  },
  {
    name: "serviceCharge",
    key: "serviceCharge",
  },
  {
    name: "useStoreTaxType",
    key: "useStoreTaxType",
  },
  {
    name: "useStoreAddr",
    key: "useStoreAddr",
  },
  {
    name: "useStoreTel",
    key: "useStoreTel",
  },
  {
    name: "ID",
    key: "_id",
  },
];

type props = {
  logs: CardLogProps[];
  handleClick: (log: CardLogProps) => void;
};

export default function CardLog({logs, handleClick}: props) {
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
          {logs?.map((log, i) => (
            <tr
              key={i}
              onClick={() => handleClick(log)}
              className="cursor-pointer">
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {new Date(log.transDate).toLocaleDateString("ko-KR")}{" "}
                {new Date(log.transDate).toLocaleTimeString("ko-KR")}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.corpNum} ({log.corpName})
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                [{CardCode[log.cardCompany as keyof typeof CardCode]}]{" "}
                {log.cardNum}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-right">
                {parseInt(log.cardApprovalCost).toLocaleString("ko-KR") || "-"}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.keyword.join(", ")}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-center">
                ({parseInt(log.tax).toLocaleString("ko-KR") || "-"},{" "}
                {log.currency})
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.cardApprovalType}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.paymentPlan}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.useStoreBizType}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.useStoreName}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.useDT}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.totalAmount}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.installmentMonths}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.serviceCharge}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.useStoreTaxType}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.useStoreAddr}
              </td>
              <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                {log.useStoreTel}
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
