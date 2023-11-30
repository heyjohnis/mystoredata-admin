import React, {useEffect, useState} from "react";
import {SearchProps} from "model/SearchForm";
import {POST} from "utils/restApi";
import {isEmptyForm} from "utils/form";

export const useCardLog = (form: SearchProps) => {
  const [logs, setLogs] = useState([]);
  const getCardLogs = () => {
    POST(`card/log`, form).then((res: any) => {
      console.log({res});
      setLogs(res?.data);
    });
  };
  useEffect(() => {
    if (!isEmptyForm(form)) return;
    getCardLogs();
  }, [form]);
  return logs;
};
