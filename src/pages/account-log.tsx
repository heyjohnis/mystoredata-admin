import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";
import {useEffect, useState} from "react";
import {AccountLogProps} from "model/accountLog";
import AccountLog from "components/account-log/AccountLog";
import {useAccountLog} from "hooks/useAccountLog";
import SearchForm from "components/SearchForm";
import {SearchProps} from "model/SearchForm";

const Index: React.FC = () => {
  const [logs, setLogs] = useState<AccountLogProps[]>([]);
  const [form, setForm] = useState<SearchProps>({all: "all"});

  const accountLogs = useAccountLog(form);

  useEffect(() => {
    console.log("accountLogs");
    setLogs(accountLogs);
  }, [accountLogs, form]);

  return (
    <>
      <Notification />
      <SectionTitle title="account raw data" subtitle="계좌데이터" />
      <Widget>
        <SearchForm form={form} handleChange={setForm} />
        <AccountLog
          logs={logs}
          handleClick={() => {
            console.log("click");
          }}
        />
      </Widget>
    </>
  );
};
export default Index;
