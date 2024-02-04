import {SearchProps} from "model/SearchForm";
import React, {useEffect, useState} from "react";
import {POST} from "@/utils/restApi";

export const useTransLogs = (form: SearchProps) => {
  const [logs, setLogs] = useState([]);
  const getTransLogs = () => {
    POST(`trans/log`, form).then((res: any) => {
      res?.data && setLogs(res.data);
    });
  };
  useEffect(() => {
    getTransLogs();
  }, [form]);

  return logs || [];
};
