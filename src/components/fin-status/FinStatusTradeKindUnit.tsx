import {FinClassCode} from "data/commonCode";
import {useEffect} from "react";

export default function FinStatusTradeKindUnit({
  finClassCode,
  finAmount,
  category,
  getTransData,
  isNegativeNumber = false,
}: any) {
  const corr = isNegativeNumber ? -1 : 1;
  useEffect(() => {
    console.log("FinClassCategory: ", category);
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
        <div className="w-24">{(c.transMoney * corr).toLocaleString()}</div>
      </li>
    ))
  );
}
