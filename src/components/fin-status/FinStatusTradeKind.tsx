import {finNumber} from "utils/finNumber";
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
      <div className="p-5 pt-1">
        <table className="w-full">
          <tbody>
            {["CASH"].includes(tradeKind || "") && (
              <>
                <tr className="border-b-[2px] border-t-[2px]">
                  <td>입금</td>
                  <td className="text-right">
                    <ul>
                      <FinStatusInOutUnit
                        finClassCode="IN3"
                        inOutAccount={inOutAccount}
                        getTransData={getTransData}
                      />

                      <li className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px] font-bold">
                        <div className="text-center w-1/2">소계</div>
                        <div className="w-1/2">
                          {sumInOutAccount("IN3", inOutAccount)}
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b-[2px]">
                  <td>출금</td>
                  <td className="text-right">
                    <ul>
                      <FinStatusInOutUnit
                        finClassCode="OUT3"
                        inOutAccount={inOutAccount}
                        getTransData={getTransData}
                        isNegativeNumber={true}
                      />
                      <li className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px] font-bold">
                        <div className="text-center w-1/2">소계</div>
                        <div className="w-1/2">
                          {sumInOutAccount("OUT3", inOutAccount)}
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
              </>
            )}
            {!["CASH"].includes(tradeKind || "") && (
              <>
                <tr className="border-b-[2px] border-t-[2px] ">
                  <td>수익</td>
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
                        <div className="w-1/2">
                          {finNumber(finAmount["IN1"])}
                        </div>
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
                          {finNumber(finAmount["OUT1"])}
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
              </>
            )}
            <tr className="border-b-[3px]">
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td> </td>
              <td> </td>
            </tr>
            <tr className="border-b-[2px]">
              <td>자산</td>
              <td className="text-right">
                <ul>
                  <FinStatusTradeKindUnit
                    finClassCode="IN3_OUT3"
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
                    finClassCode="IN2_OUT2"
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
                      finAmount.IN2 +
                        finAmount.OUT2 +
                        finAmount.IN3 +
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
