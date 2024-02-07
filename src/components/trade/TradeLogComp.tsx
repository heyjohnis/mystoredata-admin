import React from "react";
import {finNumber} from "@/utils/finNumber";

type Props = {
  logs: any;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export default function TradeLogComp({logs, handleClick}: Props) {
  console.log("TradeLogComp logs: ", logs);
  return (
    <ul>
      {logs?.map((log: any, index: number) => (
        <li
          className="flex justify-between p-2 border-b last:border-b-0 cursor-pointer dark:bg-gray-900 dark:border-gray-800 dark:text-gray-200"
          key={index}
          onClick={() => handleClick(log)}>
          <div>
            {log.transRemark || log.useStoreName || log.invoiceeCorpName}
          </div>
          <div>{finNumber(log.transMoney || log.totalAmount)}</div>
        </li>
      ))}
      {logs?.length === 0 && <li>거래내역이 없습니다.</li>}
    </ul>
  );
}
