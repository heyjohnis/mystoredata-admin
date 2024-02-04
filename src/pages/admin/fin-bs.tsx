import {useEffect, useState} from "react";

import {ClassCategoryProps} from "@/model/ClassCategoryProps";
import {SearchProps} from "@/model/SearchForm";

import {dateChange} from "@/utils/date";
import {POST} from "@/utils/restApi";

import SectionTitle from "@/components/ui/section-title";
import Widget from "@/components/ui/widget";
import CommonCodeSelect from "@/components/CommonCodeSelect";
import {Label} from "@/components/ui/forms/label";
import {Input} from "@/components/ui/forms/input";
import {InputWrapper} from "@/components/ui/forms/input-wrapper";
import {finNumber} from "@/utils/finNumber";

interface FinAmount {
  [key: string]: number;
}

type CategoryProps = {
  category: string;
  categoryName: string;
  finClassCode: string;
  total: number;
};

type FinClassDataProps = {
  [key: string]: CategoryProps[];
};

const Index: React.FC = () => {
  const [form, setForm] = useState<SearchProps>({
    userId: "bethelean",
    year: "2023",
  });
  const [finAmount, setFinAmount] = useState<FinAmount>({});
  const [finClass, setFinClass] = useState<FinClassDataProps>({});

  const handleChange = (e: any) => {
    setForm((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    POST(`/annual/save`, {
      ...form,
    }).then((res: any) => {
      console.log("resum: ");
      getTransData();
    });
  };

  const getTransData = () => {
    POST(`/annual/year`, {
      ...form,
    }).then((res: any) => {
      console.log("transdata: ", res?.data);
      setFinClass(res?.data?.finClass);
      setFinAmount(res?.data?.finClassAmount);
    });
  };

  useEffect(() => {
    getTransData();
  }, [form]);

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
            재계산
          </button>
        </div>

        <div className="justify-between">
          <div className="w-100 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-bold mb-3">거래분류</h2>
            <div className="flex justify-between m-5">
              <div className="flex justify-center cursor-pointer items-center">
                <div className="w-24 text-gray-500	text-xs mr-3">
                  번것(수익+)
                </div>
                <div className="w-24 text-right text-lg">
                  {finNumber(finAmount?.IN1)}
                </div>
              </div>
              <div className="bg-gray w-2"></div>
              <div className="flex justify-center cursor-pointer items-center">
                <div className="w-24 text-gray-500	text-xs mr-3">
                  쓴것(비용+)
                </div>
                <div className="w-24 text-right text-lg">
                  {finNumber(finAmount?.OUT1)}
                </div>
              </div>
            </div>
            <div className="flex justify-between m-5">
              <div className="flex justify-center cursor-pointer items-center">
                <div className="w-24 text-gray-500	text-xs mr-3">
                  빌린돈(부채+)
                </div>
                <div className="w-24 text-right text-lg">
                  {finNumber(finAmount?.IN2)}
                </div>
              </div>
              <div className="bg-gray w-2"></div>
              <div className="flex justify-center cursor-pointer items-center">
                <div className="w-24 text-gray-500	text-xs mr-3">
                  갚은돈(부채-)
                </div>
                <div className="w-24 text-right text-lg">
                  {finNumber(finAmount?.OUT2 || 0 * -1)}
                </div>
              </div>
            </div>
            <div className="flex justify-between m-5">
              <div className="flex justify-center cursor-pointer items-center">
                <div className="w-24 text-gray-500	text-xs mr-3">
                  나머지(자산+)
                </div>
                <div className="w-24 text-right text-lg">
                  {finNumber(finAmount?.IN3)}
                </div>
              </div>
              <div className="bg-gray w-2"></div>
              <div className="flex justify-center cursor-pointer items-center">
                <div className="w-24 text-gray-500	text-xs mr-3">
                  나머지(자산-)
                </div>
                <div className="w-24 text-right text-lg">
                  {finNumber(finAmount?.OUT3 || 0 * -1)}
                </div>
              </div>
            </div>
          </div>
          <div className="w-100 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="w-full text-lg font-bold mb-3">제무재표</h2>
            <div className="w-full">
              <div className="p-5 pt-1">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b-[2px] border-t-[2px] ">
                      <td>수익</td>
                      <td className="text-right">
                        <ul>
                          {
                            // IN1
                            finClass?.IN1?.map((item, i) => (
                              <li
                                key={i}
                                className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px]">
                                <div className="text-center w-1/2">
                                  {item.categoryName}
                                </div>
                                <div className="w-1/2">
                                  {finNumber(item.total)}
                                </div>
                              </li>
                            ))
                          }
                          <li className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px] font-bold">
                            <div className="text-center w-1/2">소계</div>
                            <div className="w-1/2">
                              {finNumber(finAmount?.IN1)}
                            </div>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="border-b-[2px]">
                      <td>지출</td>
                      <td className="text-right">
                        <ul>
                          {
                            // OUT1
                            finClass?.OUT1_PERSONAL?.map((item, i) => (
                              <li
                                key={i}
                                className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px]">
                                <div className="text-center w-1/2">
                                  {item.categoryName}
                                </div>
                                <div className="w-1/2">
                                  {finNumber(item.total)}
                                </div>
                              </li>
                            ))
                          }
                          <li className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px] font-bold">
                            <div className="text-center w-1/2">소계</div>
                            <div className="w-1/2">
                              {finNumber(finAmount?.OUT1)}
                            </div>
                          </li>
                        </ul>
                      </td>
                    </tr>
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
                          {finClass?.IN_OUT3?.map((item, i) => (
                            <li
                              key={i}
                              className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px]">
                              <div className="text-center w-1/2">
                                {item.categoryName}
                              </div>
                              <div className="w-1/2">
                                {finNumber(item.total)}
                              </div>
                            </li>
                          ))}
                          <li className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px] font-bold">
                            <div className="text-center w-1/2">소계</div>
                            <div className="">
                              {finNumber(finAmount?.IN_OUT3)}
                            </div>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="border-b-[2px]">
                      <td>부채</td>
                      <td className="text-right">
                        <ul>
                          {
                            // OUT2
                            finClass?.IN_OUT2?.map((item, i) => (
                              <li
                                key={i}
                                className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px]">
                                <div className="text-center w-1/2">
                                  {item.categoryName}
                                </div>
                                <div className="w-1/2">
                                  {finNumber(item.total)}
                                </div>
                              </li>
                            ))
                          }
                          <li className="flex justify-between cursor-pointer pt-1 pb-1 border-t-[1px] font-bold">
                            <div className="text-center w-1/2">소계</div>
                            <div className="w-1/2">
                              {finNumber(finAmount?.IN_OUT2)}
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
                            {finNumber(finAmount?.IN_OUT3 - finAmount?.IN_OUT2)}
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
