import {FinClassCode} from "data/commonCode";
import {useEffect} from "react";

export default function FinClassCategory({
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
    <li className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px]">
      <div className="inline-block w-1/6">{FinClassCode[finClassCode]}</div>
      <div className="w-1/6">
        {(finAmount[finClassCode] * corr).toLocaleString()}
      </div>
      <ul className="w-1/3">
        {category[finClassCode] &&
          category[finClassCode].map((c: any, i: number) => (
            <li
              key={i}
              className="flex justify-between cursor-pointer"
              onClick={() => getTransData(finClassCode, c.category)}>
              <div className="inline-block w-[150px] truncate text-center">
                {c.categoryName}
              </div>
              <div className="w-24">
                {(c.transMoney * corr).toLocaleString()}
              </div>
            </li>
          ))}
      </ul>
    </li>
  );
}
