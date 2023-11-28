import {SearchProps} from "model/SearchForm";
import React, {useEffect, useState} from "react";
import {isEmptyForm} from "utils/form";
import {POST} from "utils/restApi";

interface FinAmount {
  [key: string]: number;
}

type DataProps = {
  _id: string;
  amount: number;
};

const initFinAmount: FinAmount = {
  IN1: 0,
  IN2: 0,
  IN3: 0,
  OUT1: 0,
  OUT2: 0,
  OUT3: 0,
};

const initFinTaxAmount: FinAmount = {
  IN_TAX: 0,
  IN_AMT: 0,
  IN_TOTAL: 0,
  OUT_TAX: 0,
  OUT_AMT: 0,
  OUT_TOTAL: 0,
};

export const useFinStatusData = (form: SearchProps) => {
  const [finAmount, setFinAmount] = useState<FinAmount>(initFinAmount);

  const getFinStatusData = () => {
    POST(`fin-status/amount`, form).then((res: any) => {
      const finAmounts =
        res?.data.length > 0
          ? res?.data?.reduce(
              (amts: FinAmount, amt: DataProps) => {
                amts[amt._id] = amt?.amount || 0;
                return amts;
              },
              {...initFinAmount} as FinAmount
            )
          : initFinAmount;
      setFinAmount(finAmounts);
    });
  };

  useEffect(() => {
    if (!isEmptyForm) return;
    getFinStatusData();
  }, [form]);

  return finAmount;
};
