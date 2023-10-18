type Props = {
  finAmount: any;
  getFinClassData: any;
};

export default function FinClassStatus({finAmount, getFinClassData}: Props) {
  return (
    <>
      <div className="flex justify-between m-5">
        <div
          className="flex justify-center cursor-pointer items-center"
          onClick={() => getFinClassData("IN1")}>
          <div className="w-24 text-gray-500	text-xs mr-3">번것(수익+)</div>
          <div className="w-24 text-right text-lg">
            {finAmount.IN1.toLocaleString()}
          </div>
        </div>
        <div className="bg-gray w-2"></div>
        <div
          className="flex justify-center cursor-pointer items-center"
          onClick={() => getFinClassData("OUT1")}>
          <div className="w-24 text-gray-500	text-xs mr-3">쓴것(비용+)</div>
          <div className="w-24 text-right text-lg">
            {(finAmount.OUT1 * -1).toLocaleString()}
          </div>
        </div>
      </div>
      <div className="flex justify-between m-5">
        <div
          className="flex justify-center cursor-pointer items-center"
          onClick={() => getFinClassData("IN2")}>
          <div className="w-24 text-gray-500	text-xs mr-3">빌린돈(부채+)</div>
          <div className="w-24 text-right text-lg">
            {finAmount.IN2.toLocaleString()}
          </div>
        </div>
        <div className="bg-gray w-2"></div>
        <div
          className="flex justify-center cursor-pointer items-center"
          onClick={() => getFinClassData("OUT2")}>
          <div className="w-24 text-gray-500	text-xs mr-3">갚은돈(부채-)</div>
          <div className="w-24 text-right text-lg">
            {(finAmount.OUT2 * -1).toLocaleString()}
          </div>
        </div>
      </div>
      <div className="flex justify-between m-5">
        <div
          className="flex justify-center cursor-pointer items-center"
          onClick={() => getFinClassData("IN3")}>
          <div className="w-24 text-gray-500	text-xs mr-3">나머지(자산-)</div>
          <div className="w-24 text-right text-lg">
            {finAmount.IN3.toLocaleString()}
          </div>
        </div>
        <div className="bg-gray w-2"></div>
        <div
          className="flex justify-center cursor-pointer items-center"
          onClick={() => getFinClassData("OUT3")}>
          <div className="w-24 text-gray-500	text-xs mr-3">나머지(자산+)</div>
          <div className="w-24 text-right text-lg">
            {(finAmount.OUT3 * -1).toLocaleString()}
          </div>
        </div>
      </div>
      <div className="flex justify-between m-5">
        <div
          className="flex justify-center cursor-pointer items-center"
          onClick={() => getFinClassData("IN4")}>
          <div className="w-24 text-gray-500	text-xs mr-3">미지정(입금)</div>
          <div className="w-24 text-right text-lg">
            {finAmount.IN4.toLocaleString()}
          </div>
        </div>
        <div className="bg-gray w-2"></div>
        <div
          className="flex justify-center cursor-pointer items-center"
          onClick={() => getFinClassData("OUT4")}>
          <div className="w-24 text-gray-500	text-xs mr-3">미지정(출금)</div>
          <div className="w-24 text-right text-lg">
            {(finAmount.OUT4 * -1).toLocaleString()}
          </div>
        </div>
      </div>
    </>
  );
}
