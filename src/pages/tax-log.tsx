import {useEffect, useState} from "react";
import {TaxLogProps} from "model/TaxLog";
import SearchForm from "components/SearchForm";
import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";

import {SearchProps} from "model/SearchForm";
import TaxLog from "components/tax/TaxLog";
import {useTaxLog} from "hooks/useTaxLog";

const Index: React.FC = () => {
  const [logs, setLogs] = useState<TaxLogProps[]>([]);
  const [form, setForm] = useState<SearchProps>({all: "all"});

  const taxlog = useTaxLog(form);
  useEffect(() => {
    setLogs(taxlog);
  }, [taxlog]);

  return (
    <>
      <Notification />
      <SectionTitle title="tax receipt" subtitle="세금계산서 이력" />
      <Widget>
        <SearchForm form={form} handleChange={setForm} />
        <TaxLog
          logs={logs}
          handleClick={(e) => {
            console.log(e);
          }}
        />
      </Widget>
    </>
  );
};
export default Index;
