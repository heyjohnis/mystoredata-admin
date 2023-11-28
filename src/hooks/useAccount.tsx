import React, {useEffect, useState} from "react";
import {POST} from "utils/restApi";
import {AccountLogProps} from "model/accountLog";
import {SearchProps} from "model/SearchForm";

export const useAccount = (form: SearchProps) => {
  const [logs, setLogs] = useState<AccountLogProps[]>([]);

  const isEmptyForm = (form: SearchProps): boolean => {
    let isValied = false;
    Object.values(form || {})?.forEach((val: string) => {
      console.log("val: ", val);
      isValied = isValied || !!val;
    });
    return isValied;
  };

  useEffect(() => {
    if (!isEmptyForm(form)) return;
    console.log("useAccount");
    POST(`account/log`, {...form}).then((res: any) => {
      setLogs(res?.data);
    });
  }, [form]);

  return logs || [];
};
