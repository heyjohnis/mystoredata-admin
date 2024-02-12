import {useEffect} from "react";
import {finNumber} from "@/utils/finNumber";

export default function FinStatusTradeKindUnit({
  finClassCode,
  category,
  getTransData,
}: any) {
  useEffect(() => {
    console.log(`FinClassCategory ${finClassCode} : `, category[finClassCode]);
  }, [category]);

  return (
    category[finClassCode || ""]?.length > 0 &&
    category[finClassCode].map((c: any, i: number) => (
      <li
        key={i}
        className="flex justify-between cursor-pointer"
        onClick={() => getTransData(finClassCode, c.category)}>
        <div className="inline-block w-[150px] truncate text-center">
          {c.categoryName}
        </div>
        <div className="w-24">{finNumber(c.transMoney)}</div>
      </li>
    ))
  );
}
