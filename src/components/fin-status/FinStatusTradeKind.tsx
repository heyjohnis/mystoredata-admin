import {finNumber} from "utils/finNumber";
import FinClassCategory from "./FinClassCategory";
import FinStatusTradeKindUnit from "./FinStatusTradeKindUnit";

type categoryProps = {
  finClassCode: string;
  category: string;
  categoryNames: string;
  transMoney: number;
};

type classCategoryProps = {
  IN1: Array<categoryProps>;
  IN2: Array<categoryProps>;
  IN3: Array<categoryProps>;
  OUT1: Array<categoryProps>;
  OUT2: Array<categoryProps>;
  OUT3: Array<categoryProps>;
};

type Props = {
  finAmount: any;
  category: classCategoryProps;
  getTransData: any;
  isNegativeNumber?: boolean;
};

export default function FinStatusTradeKind({
  finAmount,
  category,
  getTransData,
}: Props) {
  return (
    <>
      <div className="p-5 pt-1">
        <table className="w-full">
          <tbody>
            <tr className="border-b-[2px] border-t-[2px]">
              <td>수입</td>
              <td className="text-right">
                <ul>
                  <FinStatusTradeKindUnit
                    finClassCode="IN1"
                    finAmount={finAmount}
                    category={category}
                    getTransData={getTransData}
                  />

                  <li className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px] font-bold">
                    <div className="text-center w-1/2">소계</div>
                    <div className="w-1/2">{finNumber(finAmount["IN1"])}</div>
                  </li>
                </ul>
              </td>
            </tr>
            <tr className="border-b-[2px]">
              <td>지출</td>
              <td className="text-right">
                <ul>
                  <FinStatusTradeKindUnit
                    finClassCode="OUT1"
                    finAmount={finAmount}
                    category={category}
                    getTransData={getTransData}
                    isNegativeNumber={true}
                  />
                  <li className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px] font-bold">
                    <div className="text-center w-1/2">소계</div>
                    <div className="w-1/2">
                      {finNumber(finAmount["OUT1"] * -1)}
                    </div>
                  </li>
                </ul>
              </td>
            </tr>
            <tr className="border-b-[2px]">
              <td>자산</td>
              <td className="text-right">
                <ul>
                  <FinStatusTradeKindUnit
                    finClassCode="IN3"
                    finAmount={finAmount}
                    category={category}
                    getTransData={getTransData}
                  />
                  <FinStatusTradeKindUnit
                    finClassCode="OUT3"
                    finAmount={finAmount}
                    category={category}
                    getTransData={getTransData}
                  />
                  <li className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px] font-bold">
                    <div className="text-center w-1/2">소계</div>
                    <div className="">
                      {finNumber(finAmount["IN3"] + finAmount["OUT3"])}
                    </div>
                  </li>
                </ul>
              </td>
            </tr>
            <tr className="border-b-[2px]">
              <td>부채</td>
              <td className="text-right">
                <ul>
                  <FinStatusTradeKindUnit
                    finClassCode="IN2"
                    finAmount={finAmount}
                    category={category}
                    getTransData={getTransData}
                  />
                  <FinStatusTradeKindUnit
                    finClassCode="OUT2"
                    finAmount={finAmount}
                    category={category}
                    getTransData={getTransData}
                  />
                  <li className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px] font-bold">
                    <div className="text-center w-1/2">소계</div>
                    <div className="w-1/2">
                      {finNumber(finAmount["IN2"] + finAmount["OUT2"])}
                    </div>
                  </li>
                </ul>
              </td>
            </tr>
            <tr className="border-b-[2px]">
              <td>자본</td>
              <td className="text-right">
                <li className="flex justify-between font-bold">
                  <div className="text-center w-1/2">소계</div>
                  <div className="w-1/2">
                    {finNumber(
                      finAmount.IN1 +
                        finAmount.IN2 +
                        finAmount.IN3 +
                        finAmount.OUT1 +
                        finAmount.OUT2 +
                        finAmount.OUT3
                    )}
                  </div>
                </li>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
