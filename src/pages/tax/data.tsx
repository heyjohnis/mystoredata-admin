import {useEffect, useState} from "react";
import {BaroBankCode, CardCode, UsePurpose} from "data/commonCode";
import {POST, PUT} from "utils/restApi";
import {TaxLogProps} from "model/TaxLog";
import SearchForm from "components/SearchForm";
import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";

import {SearchProps} from "model/SearchForm";

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
    name: "NTSSendKey",
    key: "NTSSendKey",
  },
  {
    name: "purposeType",
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
    name: "AmountTotal",
    key: "AmountTotal",
  },
  {
    name: "TaxTotal",
    key: "TaxTotal",
  },
  {
    name: "TotalAmount:",
    key: "TotalAmount:",
  },
  {
    name: "Remark1:",
    key: "Remark1:",
  },
  {
    name: "ItemName:",
    key: "ItemName:",
  },
];

const Index: React.FC = () => {
  const [logs, setLogs] = useState<TaxLogProps[]>([]);
  const [asset, setAsset] = useState<TaxLogProps | null>(null);
  const [form, setForm] = useState<SearchProps | null>(null);
  useEffect(() => {
    getTaxLogs();
  }, [form]);

  const getTaxLogs = () => {
    POST(`tax/logs`, form).then((res: any) => {
      console.log({res});
      setLogs(res.data);
    });
  };
  return (
    <>
      <Notification />
      <SectionTitle title="tax receipt" subtitle="세금계산서 이력" />
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
              {logs &&
                logs.map((log, i) => (
                  <tr
                    key={i}
                    className={`${!log.useYn && "line-through text-gray-400"}`}>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {new Date(log.issueDT).toLocaleDateString("ko-KR")}{" "}
                      {new Date(log.issueDT).toLocaleTimeString("ko-KR")}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {log.corpNum}
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
                      {log.amountTotal.toLocaleString("ko-KR")}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {log.taxTotal.toLocaleString("ko-KR")}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {log.totalAmount.toLocaleString("ko-KR")}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {log.remark1}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {log.itemName}
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
