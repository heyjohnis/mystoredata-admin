import React from "react";

type Props = {
  logs: any;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export default function TradeLogComp({logs, handleClick}: Props) {
  return (
    <ul>
      {logs.map((log: any, index: number) => (
        <li
          className="flex justify-between p-2 border-b last:border-b-0 cursor-pointer dark:bg-gray-900 dark:border-gray-800 dark:text-gray-200"
          key={index}
          onClick={() => handleClick(log)}>
          <div>{log.transRemark || log.useStoreName}</div>
          <div>{log.transMoney.toLocaleString()}</div>
        </li>
      ))}
      {logs.length === 0 && <li>거래내역이 없습니다.</li>}
    </ul>
  );
}
