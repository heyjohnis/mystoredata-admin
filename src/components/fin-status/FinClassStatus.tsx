import {finNumber} from "@/utils/finNumber";

type Props = {
  finAmount: any;
  getTransData: any;
};

export default function FinClassStatus({finAmount, getTransData}: Props) {
  return (
    <>
      <div className="flex w-full justify-between">
        <div className="text-xs">
          <div
            className="flex justify-between cursor-pointer items-center mb-2"
            onClick={() => getTransData("IN1")}>
            <div className="text-gray-500 mr-3">번것(수익+)</div>
            <div className="text-right">{finNumber(finAmount.IN1)}</div>
          </div>
          <div
            className="flex justify-between cursor-pointer items-center mb-2"
            onClick={() => getTransData("OUT2")}>
            <div className="text-gray-500 mr-3">갚은돈(부채-)</div>
            <div className="text-right">{finNumber(finAmount.OUT2)}</div>
          </div>
          <div
            className="flex justify-between cursor-pointer items-center mb-2"
            onClick={() => getTransData("IN3")}>
            <div className="text-gray-500 mr-3">나머지(자산+)</div>
            <div className="text-right">{finNumber(finAmount.IN3)}</div>
          </div>
        </div>
        <div className="text-xs">
          <div
            className="flex justify-between cursor-pointer items-center mb-2"
            onClick={() => getTransData("OUT1")}>
            <div className="text-gray-500 mr-3">쓴것(비용+)</div>
            <div className="text-right">{finNumber(finAmount.OUT1)}</div>
          </div>
          <div
            className="flex justify-between cursor-pointer items-center mb-2"
            onClick={() => getTransData("IN2")}>
            <div className="text-gray-500 mr-3">빌린돈(부채+)</div>
            <div className="text-right">{finNumber(finAmount.IN2)}</div>
          </div>

          <div
            className="flex justify-between cursor-pointer items-center "
            onClick={() => getTransData("OUT3")}>
            <div className="text-gray-500 mr-3">나머지(자산-)</div>
            <div className="text-right">{finNumber(finAmount.OUT3)}</div>
          </div>
        </div>
      </div>
    </>
  );
}
