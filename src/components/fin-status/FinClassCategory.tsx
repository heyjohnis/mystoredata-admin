import {FinClassCode} from "data/commonCode";

export default function FinClassCategory({
  finClassCode,
  finAmount,
  category,
  getTransData,
}: any) {
  return (
    <li className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px]">
      <div className="inline-block w-1/6">{FinClassCode[finClassCode]}</div>
      <div className="w-1/6">{finAmount[finClassCode].toLocaleString()}</div>
      <ul className="w-1/3">
        {category[finClassCode] &&
          category[finClassCode].map((c: any, i: number) => (
            <li
              key={i}
              className="flex justify-between"
              onClick={() => getTransData(finClassCode, c.category)}>
              <div className="inline-block w-[100px] truncate">
                {c.categoryName}
              </div>
              <div className="w-24">{c.transMoney.toLocaleString()}</div>
            </li>
          ))}
      </ul>
    </li>
  );
}
