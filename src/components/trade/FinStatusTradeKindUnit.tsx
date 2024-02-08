import {useEffect} from "react";
import {finNumber} from "@/utils/finNumber";

export default function FinStatusTradeKindUnit({
  finClassCode = "",
  category,
  getTransData,
}: any) {
  useEffect(() => {
    console.log(`FinClassCategory ${finClassCode} : `, category[finClassCode]);
  }, [category]);

  return (
    category[finClassCode || ""]?.length > 0 &&
    category[finClassCode || ""].map((c: any, i: number) => (
      <li
        key={i}
        className="w-full flex justify-end py-[3px]"
        onClick={() => getTransData(finClassCode, c.category)}>
        <label className="w-max-24 text-right">{c.categoryName}</label>
        <div className="w-24 text-right">{finNumber(c.transMoney)}</div>
      </li>
    ))
  );
}
