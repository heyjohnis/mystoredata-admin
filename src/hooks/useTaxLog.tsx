import React, {useEffect, useState} from "react";
import {SearchProps} from "@/model/SearchForm";
import {POST} from "@/utils/restApi";
import {isEmptyForm} from "@/utils/form";

export const useTaxLog = (form: SearchProps) => {
  const [logs, setLogs] = useState([]);

  const getTaxLogs = () => {
    POST(`tax/logs`, {...form}).then((res: any) => {
      setLogs(res?.data);
    });
  };

  useEffect(() => {
    if (!isEmptyForm(form)) return;
    console.log("useTaxLog", form);
    getTaxLogs();
  }, [form]);

  return logs;
};
