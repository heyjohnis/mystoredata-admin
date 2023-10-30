import FinClassCategory from "./FinClassCategory";

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

export default function FinDailyStatus({
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
              <td>수익</td>
              <td className="text-right">
                <ul>
                  <FinClassCategory
                    finClassCode="IN1"
                    finAmount={finAmount}
                    category={category}
                    getTransData={getTransData}
                  />
                </ul>
              </td>
            </tr>
            <tr className="border-b-[2px]">
              <td>지출</td>
              <td className="text-right">
                <ul>
                  <FinClassCategory
                    finClassCode="OUT1"
                    finAmount={finAmount}
                    category={category}
                    getTransData={getTransData}
                    isNegativeNumber={true}
                  />
                </ul>
              </td>
            </tr>
            <tr className="border-b-[2px]">
              <td>내 돈(자산)</td>
              <td className="text-right">
                <ul>
                  <FinClassCategory
                    finClassCode="IN3"
                    finAmount={finAmount}
                    category={category}
                    getTransData={getTransData}
                  />
                  <FinClassCategory
                    finClassCode="OUT3"
                    finAmount={finAmount}
                    category={category}
                    getTransData={getTransData}
                  />
                  <li className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px]">
                    <div className="inline-block w-1/6">계</div>
                    <div className="w-1/6">
                      {(finAmount["IN3"] + finAmount["OUT3"]).toLocaleString()}
                    </div>
                    <ul className="w-1/3">
                      <li className="flex justify-between">
                        <div className="inline-block w-[100px] truncate">
                          계
                        </div>
                        <div className="w-24">
                          {(
                            finAmount["IN3"] + finAmount["OUT3"]
                          ).toLocaleString()}
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </td>
            </tr>
            <tr className="border-b-[2px]">
              <td>남의 돈(부채)</td>
              <td className="text-right">
                <ul>
                  <FinClassCategory
                    finClassCode="IN2"
                    finAmount={finAmount}
                    category={category}
                    getTransData={getTransData}
                  />
                  <FinClassCategory
                    finClassCode="OUT2"
                    finAmount={finAmount}
                    category={category}
                    getTransData={getTransData}
                  />
                  <li className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px]">
                    <div className="inline-block w-1/6">계</div>
                    <div className="w-1/6">
                      {(finAmount["IN2"] + finAmount["OUT2"]).toLocaleString()}
                    </div>
                    <ul className="w-1/3">
                      <li className="flex justify-between">
                        <div className="inline-block w-[100px] truncate">
                          계
                        </div>
                        <div className="w-24">
                          {(
                            finAmount["IN2"] + finAmount["OUT2"]
                          ).toLocaleString()}
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </td>
            </tr>
            <tr className="border-b-[2px]">
              <td>남은 돈(자본)</td>
              <td className="text-right">
                <li className="flex justify-between">
                  <div className="inline-block w-25"></div>
                  <div>
                    {(
                      finAmount.IN1 +
                      finAmount.IN2 +
                      finAmount.IN3 +
                      finAmount.OUT1 +
                      finAmount.OUT2 +
                      finAmount.OUT3
                    ).toLocaleString()}
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
