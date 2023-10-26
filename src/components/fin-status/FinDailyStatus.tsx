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
                  <FinClassCategory
                    finClassCode="IN2"
                    finAmount={finAmount}
                    category={category}
                    getTransData={getTransData}
                  />
                  <FinClassCategory
                    finClassCode="IN3"
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
                  />
                  <FinClassCategory
                    finClassCode="OUT2"
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
                    getTransData={() => getTransData}
                  />
                  <FinClassCategory
                    finClassCode="OUT3"
                    finAmount={finAmount}
                    category={category}
                    getTransData={getTransData}
                  />
                  <FinClassCategory
                    finClassCode="IN1"
                    finAmount={finAmount}
                    category={category}
                    getTransData={getTransData}
                  />
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
