import {useEffect, useState} from "react";
import {finNumber} from "utils/finNumber";

export default function FinStatusInOutUnit({
  finClassCode,
  inOutAccount,
  getTransData,
}: any) {
  const [categoryData, setCategoryData] = useState<any>([]);
  useEffect(() => {
    console.log("inOutAccount: ", inOutAccount);
    const data = inOutAccount.filter(
      (c: any) => c.finClassCode === finClassCode
    );

    setCategoryData(data);
  }, [inOutAccount]);

  return (
    categoryData.length > 0 &&
    categoryData.map((c: any, i: number) => (
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
