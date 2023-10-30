import {useEffect, useState} from "react";
import {BaroBankCode, CardCode, UsePurpose} from "data/commonCode";
import {POST, PUT} from "utils/restApi";
import {TaxLogProps} from "model/TaxLog";
import SearchForm from "components/SearchForm";
import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";

import {SearchProps} from "model/SearchForm";
import TaxLog from "components/tax/TaxLog";

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
        <TaxLog logs={logs} />
      </Widget>
    </>
  );
};
export default Index;
