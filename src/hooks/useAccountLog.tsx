import React, {useEffect, useState} from "react";
import {POST} from "@/utils/restApi";
import {AccountLogProps} from "@/model/accountLog";
import {SearchProps} from "@/model/SearchForm";
import {isEmptyForm} from "@/utils/form";

export const useAccountLog = (form: SearchProps) => {
  const [logs, setLogs] = useState<AccountLogProps[]>([]);

  useEffect(() => {
    if (!isEmptyForm(form)) return;
    POST(`account/log`, {...form}).then((res: any) => {
      setLogs(res?.data);
    });
  }, [form]);

  return logs || [];
};
