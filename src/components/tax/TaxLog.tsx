import {TaxLogProps} from "model/TaxLog";

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
    name: "TotalAmount:",
    key: "TotalAmount:",
  },
  {
    name: "AmountTotal",
    key: "AmountTotal",
  },
  {
    name: "TaxTotal",
    key: "TaxTotal",
  },
  {
    name: "발행자",
    key: "NTSSendKey",
  },
  {
    name: "수신자",
    key: "purposeType",
  },
  {
    name: "modifyCode",
    key: "modifyCode",
  },
  {
    name: "taxType",
    key: "taxType",
  },
  {
    name: "InvoiceeBizClass",
    key: "InvoiceeBizClass",
  },
  {
    name: "Remark1",
    key: "remark1",
  },
  {
    name: "ItemName:",
    key: "ItemName:",
  },
  {
    name: "ID",
    key: "_id",
  },
];

export default function TaxLogs({
  logs,
  handleClick,
}: {
  logs: TaxLogProps[];
  handleClick: (log: TaxLogProps) => void;
}) {
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
          {logs &&
            logs.map((log, i) => (
              <tr
                key={i}
                onClick={() => handleClick(log)}
                className={`${
                  !log.useYn && "line-through text-gray-400"
                } cursor-pointer`}>
                <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  {new Date(log.issueDT).toLocaleDateString("ko-KR")}{" "}
                  {new Date(log.issueDT).toLocaleTimeString("ko-KR")}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  {log.corpNum} ({log.corpName})
                </td>
                <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  {log.totalAmount.toLocaleString("ko-KR")}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  {log.amountTotal.toLocaleString("ko-KR")}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  {log.taxTotal.toLocaleString("ko-KR")}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  {log.invoicerCorpNum} {log.invoicerCorpName}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  {log.invoiceeCorpNum} {log.invoiceeCorpName}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  {log.invoiceeBizType}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  {log.invoiceeBizClass}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  {log.ntsSendKey}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  {log.purposeType}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  {log.modifyCode}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  {log.taxType}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  {log.remark1}
                </td>
                <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  {log.itemName}
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
