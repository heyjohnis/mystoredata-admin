import {useEffect, useState} from "react";

import {TransMoneyProps} from "model/TransMoney";
import {ClassCategoryProps} from "model/ClassCategoryProps";
import {SearchProps} from "model/SearchForm";
import {AccountLogProps} from "model/accountLog";
import {CardLogProps} from "model/cardLog";

import {dateChange} from "utils/date";
import {POST} from "utils/restApi";

import TransMoneyLog from "components/trans-money/TransMoneyLog";
import FinClassStatus from "components/fin-status/FinClassStatus";
import FinStatusTradeKind from "components/fin-status/FinStatusTradeKind";
import SectionTitle from "components/section-title";
import Widget from "components/widget";
import {TaxLogProps} from "model/TaxLog";
import {InputWrapper} from "components/forms/input-wrapper";
import CommonCodeSelect from "components/CommonCodeSelect";
import {Label} from "components/forms/label";
import {Input} from "components/forms/input";
import {finNumber} from "utils/finNumber";

interface FinAmount {
  [key: string]: number;
}

const initFinAmount: FinAmount = {
  IN1: 0,
  IN2: 0,
  IN3: 0,
  OUT1: 0,
  OUT2: 0,
  OUT3: 0,
};

type assetProps = {
  account: string;
  itemName: string;
  amount: number;
};

const initCategory: ClassCategoryProps = {
  IN1: [],
  IN2: [],
  IN3: [],
  OUT1: [],
  OUT2: [],
  OUT3: [],
  IN_OUT2: [],
  IN_OUT3: [],
};

const Index: React.FC = () => {
  const [form, setForm] = useState<SearchProps>({});
  const [finAmount, setFinAmount] = useState<FinAmount>(initFinAmount);
  const [accountAmount, setAccountAmount] = useState<assetProps[]>([]);
  const [logs, setLogs] = useState<TransMoneyProps[]>([]);
  const [category, setCategory] = useState<ClassCategoryProps>(initCategory);

  const handleChange = (e: any) => {
    setForm((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    getTransData();
  };

  const getTransData = () => {
    POST(`annual/year`, {
      ...form,
    }).then((res: any) => {
      console.log("transdata: ", res?.data);
    });
  };

  useEffect(() => {}, [category]);

  return (
    <>
      <SectionTitle title="Financial Status" subtitle="재무상태" />
      <Widget>
        <div className="flex m-3">
          <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
            <Label>사용자ID</Label>
            <Input
              name="userId"
              type="text"
              value={form.userId}
              onChange={handleChange}
            />
          </InputWrapper>

          <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
            <Label>연도</Label>
            <CommonCodeSelect
              name="year"
              onChange={handleChange}
              value={form?.year}
              commonCode={{"2023": "2023", "2024": "2024"}}
            />
          </InputWrapper>

          <button
            className="px-4 py-2 text-xs font-bold text-white uppercase bg-gray-500 rounded-lg hover:bg-gray-600 mr-1"
            onClick={handleSubmit}>
            조회
          </button>
        </div>

        <div className="justify-between">
          <div className="w-100 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-bold mb-3">거래분류</h2>
            <FinClassStatus finAmount={finAmount} getTransData={getTransData} />
          </div>
          <div className="w-100 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="w-full text-lg font-bold mb-3">제무재표</h2>
            <div className="w-full">
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
                              {finNumber(finAmount["IN3"] - finAmount["OUT3"])}
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
                              {finNumber(finAmount["IN2"] - finAmount["OUT2"])}
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
                              finAmount.IN3 -
                                finAmount.OUT3 -
                                finAmount.IN2 +
                                finAmount.OUT2
                            )}
                          </div>
                        </li>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Widget>
    </>
  );
};
export default Index;
