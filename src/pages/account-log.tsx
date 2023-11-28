import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";
import {Input} from "components/forms/input";
import {InputWrapper} from "components/forms/input-wrapper";
import {Label} from "components/forms/label";

import {useEffect, useState} from "react";
import {GET} from "utils/restApi";
import {AccountLogProps} from "model/accountLog";
import {BaroBankCode} from "data/commonCode";
import AccountLog from "components/account-log/AccountLog";

import {useAccount} from "hooks/useAccount";
import SearchForm from "components/SearchForm";
import {SearchProps} from "model/SearchForm";

const Index: React.FC = () => {
  const [logs, setLogs] = useState<AccountLogProps[]>([]);
  const [form, setForm] = useState<SearchProps>();
  const [test, setTest] = useState<string>("");
  const accountLogs = useAccount(form);
  useEffect(() => {
    console.log("accountLogs");
    setLogs(accountLogs);
  }, [accountLogs, form]);

  return (
    <>
      <Notification />
      <SectionTitle title="account raw data" subtitle="계좌데이터" />
      <Widget>
        <SearchForm form={form} handleChange={setForm} />{" "}
        <AccountLog logs={logs} />
      </Widget>
    </>
  );
};
export default Index;
