import {Input} from "components/forms/input";
import {AccountProps} from "model/account";
import {useEffect, useState} from "react";
import {InputWrapper} from "components/forms/input-wrapper";
import {POST, PUT, DELETE, GET} from "utils/restApi";
import CommonCodeSelect from "components/CommonCodeSelect";
import {BaroBankCode, CorpType, UsePurpose} from "data/commonCode";
import {TransMoneyProps} from "model/TransMoney";

export default function TransList({remark}: any) {
  const [transList, setTransList] = useState<TransMoneyProps[]>([]);
  const handleChange = (e: any) => {
    console.log(e.target.value);
  };

  // const updateTrans = () => {
  //   PUT(`trans/update/${form?._id}`, form)
  //     .then((res: any) => {
  //       console.log({res});
  //       if (res.data.n > 0) alert("저장되었습니다");
  //     })
  //     .catch((err) => {
  //       console.log({err});
  //     });
  // };
  useEffect(() => {
    getTransList();
  }, []);

  const getTransList = async () => {
    const res = GET(`trans/non-category?remark=${remark}`);
    setTransList(res.data);
  };

  const handleChangeUsePurpose = async (account: AccountProps) => {
    const result = await PUT("trans/update", {...account});
    console.log({result});
  };

  return (
    <div className="w-full overflow-x-auto mt-3">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <div className="text-l font-bold">계좌정보</div>
        </div>
      </div>
      <div className="w-full">
        {transList &&
          transList.map((transItem: TransMoneyProps, i: any) => (
            <div key={i} className="flex justify-between">
              <div className="flex">
                <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                  <Input
                    name=""
                    type="text"
                    width="w-36"
                    value={`${transItem?.transRemark || ""} ${
                      transItem?.useStoreName || ""
                    }`}
                    readOnly={true}
                  />
                </InputWrapper>
                <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                  <Input
                    name="transDate"
                    type="text"
                    width="w-36"
                    placeholder="날짜"
                    value={`${
                      transItem?.transDate.toLocaleDateString() || ""
                    } ${transItem?.transDate.toLocaleTimeString() || ""}`}
                    onChange={handleChange}
                    readOnly={true}
                  />
                </InputWrapper>
                <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                  <CommonCodeSelect
                    name="useKind"
                    commonCode={UsePurpose}
                    value={transItem?.useKind}
                    placeholder="사용목적"
                  />
                </InputWrapper>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
