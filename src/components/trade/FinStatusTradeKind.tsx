import {finNumber} from "@/utils/finNumber";
import FinStatusTradeKindUnit from "./FinStatusTradeKindUnit";
import FinStatusInOutUnit from "./FinStatusInOutUnit";

type categoryProps = {
  finClassCode: string;
  category: string;
  categoryName: string;
  transMoney: number;
};

type classCategoryProps = {
  IN1: Array<categoryProps>;
  IN2: Array<categoryProps>;
  IN3: Array<categoryProps>;
  OUT1: Array<categoryProps>;
  OUT2: Array<categoryProps>;
  OUT3: Array<categoryProps>;
  IN_OUT2: Array<categoryProps>;
  IN_OUT3: Array<categoryProps>;
};

type Props = {
  finAmount: any;
  category: classCategoryProps;
  getTransData: any;
  isNegativeNumber?: boolean;
  inOutAccount: any;
  tradeKind: string | undefined;
};

export default function FinStatusTradeKind({
  finAmount,
  category,
  getTransData,
  inOutAccount,
  tradeKind,
}: Props) {
  const sumInOutAccount = (finClassCode: string, inOutAccount: any) => {
    const sum = inOutAccount.reduce((acc: number, cur: any) => {
      acc += cur?.finClassCode === finClassCode ? cur?.transMoney : 0;
      return acc;
    }, 0);
    return finNumber(sum);
  };

  return (
    <>
      <div className="w-100 px-6 py-2 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <div className="border-b border-gray-100 flex justify-between py-1 min-h-[40px]">
          <label className="w-20 flex items-center text-sm font-bold text-gray-700 dark:text-gray-200">
            {tradeKind === "CASH" ? "수입" : "수익"}
          </label>

          <ul className="w-full">
            <FinStatusTradeKindUnit
              finClassCode="IN1"
              finAmount={finAmount}
              category={category}
              getTransData={getTransData}
            />

            <li className="w-full flex justify-end py-1 mt-1">
              <label className="text-right flex font-bold">소계</label>
              <div className="w-24 text-right font-bold">
                {sumInOutAccount("IN1", inOutAccount)}
              </div>
            </li>
          </ul>
        </div>
        <div className=" border-gray-100 flex justify-between py-1 min-h-[40px]">
          <label className="w-20 flex-none flex items-center text-sm font-bold text-gray-700 dark:text-gray-200">
            {tradeKind === "CASH" ? "지출" : "비용"}
          </label>
          <ul className="w-full">
            <FinStatusTradeKindUnit
              finClassCode="OUT1"
              finAmount={finAmount}
              category={category}
              getTransData={getTransData}
              isNegativeNumber={true}
            />
            <li className="w-full flex justify-end py-1 mt-1">
              <label className="text-right flex font-bold">소계</label>
              <div className="w-24 text-right font-bold">
                {sumInOutAccount("OUT1", inOutAccount)}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-100 mt-3 px-6 py-2 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <div className="border-b border-gray-100 flex justify-between py-1 min-h-[40px]">
          <label className="w-20 flex items-center text-sm font-bold text-gray-700 dark:text-gray-200">
            자산
          </label>
          <ul className="w-full">
            <FinStatusTradeKindUnit
              finClassCode="IN3_OUT3"
              finAmount={finAmount}
              category={category}
              getTransData={getTransData}
            />
            <li className="w-full flex justify-end py-1 mt-1">
              <label className="text-right flex font-bold">소계</label>
              <div className="w-24 text-right font-bold">
                {finNumber(finAmount["IN3"] - finAmount["OUT3"])}
              </div>
            </li>
          </ul>
        </div>
        <div className="border-b border-gray-100 flex justify-between py-1 min-h-[40px]">
          <label className="w-20 flex items-center text-sm font-bold text-gray-700 dark:text-gray-200">
            부채
          </label>
          <ul className="w-full">
            <FinStatusTradeKindUnit
              finClassCode="IN2_OUT2"
              finAmount={finAmount}
              category={category}
              getTransData={getTransData}
            />
            <li className="w-full flex justify-end py-1 mt-1">
              <label className="text-right flex font-bold">소계</label>
              <div className="w-24 text-right font-bold">
                {finNumber(finAmount["IN2"] - finAmount["OUT2"])}
              </div>
            </li>
          </ul>
        </div>
        <div className=" border-gray-100 flex justify-between py-1 min-h-[40px]">
          <label className="w-20 flex items-center text-sm font-bold text-gray-700 dark:text-gray-200">
            자본
          </label>
          <ul className="w-full">
            <li className="w-full flex justify-end py-1 mt-1">
              <label className="text-right flex font-bold">소계</label>
              <div className="w-24 text-right font-bold">
                {finNumber(
                  finAmount.IN3 -
                    finAmount.OUT3 -
                    finAmount.IN2 +
                    finAmount.OUT2
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
