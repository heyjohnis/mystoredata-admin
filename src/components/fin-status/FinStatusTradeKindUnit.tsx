import {FinClassCode} from "data/commonCode";
import {useEffect} from "react";
import {finNumber} from "utils/finNumber";

export default function FinStatusTradeKindUnit({
  finClassCode,
  category,
  getTransData,
  isNegativeNumber = false,
}: any) {
  const corr = isNegativeNumber ? -1 : 1;
  useEffect(() => {
    console.log(`FinClassCategory ${finClassCode} : `, category[finClassCode]);
  }, [category]);

  return (
    category[finClassCode] &&
    category[finClassCode].map((c: any, i: number) => (
      <li
        key={i}
        className="flex justify-between"
        onClick={() => getTransData(finClassCode, c.category)}>
        <div className="inline-block w-[150px] truncate text-center">
          {c.categoryName}
        </div>
        <div className="w-24">{finNumber(c.transMoney * corr)}</div>
      </li>
    ))
  );
}
