import {Input} from "@/components/ui/forms/input";
import {AccountProps} from "@/model/account";
import {useState} from "react";
import {InputWrapper} from "@/components/ui/forms/input-wrapper";
import AccountInput from "./accountInput";
import {POST, PUT, DELETE} from "@/utils/restApi";
import CommonCodeSelect from "@/components/CommonCodeSelect";
import {BaroBankCode, CorpType, UseKind} from "@/data/commonCode";

export default function AccountList({accounts, user, baseMonth}: any) {
  //const [form, setForm] = useState<AccountProps>();
  const [accountList, setAccountList] = useState<AccountProps[]>(accounts);
  const handleChange = (e: any) => {
    console.log(e.target.value);
    // const {name, value} = e.target;
    // setForm((prevState: any) => ({...prevState, [name]: value}));
  };

  const addAccount = (account: AccountProps) => {
    setAccountList((prevState: any) => [...prevState, account]);
  };

  const accountDetail = () => {
    console.log("account detail");
  };

  const accountDelete = (account: AccountProps) => {
    console.log("account delete: ", account);
    DELETE(`/account/delete/${account._id}`, account).then((res: any) => {
      console.log(res);
      setAccountList(
        accountList.filter(
          (item: AccountProps) => item.bankAccountNum !== account.bankAccountNum
        )
      );
      //alert('삭제에 실패하였습니다.\n' + res.data.error.message);
    });
  };

  const handleChangeUsePurpose = async (account: AccountProps) => {
    const result = await PUT("account/update", {...account});
    console.log({result});
  };

  const syncAccountLog = (account: AccountProps) => {
    console.log("account sync: ", account);
    POST("/account/regLog", {
      ...account,
      corpNum: user.corpNum,
      userId: user.userId,
      birth: user.birth,
      baseMonth,
    })
      .then((res: any) => {
        if (res?.data?.success) {
          alert("데이터 수집이 완료되었습니다.");
        }
        console.log("account/regLog: ", res);
      })
      .catch((err: any) => {
        console.log("account/regLog: ", err);
      });
  };

  const regFinItem = (account: AccountProps) => {
    const req = {
      user: user._id,
      userId: user.userId,
      account: account._id,
      bankAccountNum: account.bankAccountNum,
      bank: account.bank,
    };
    console.log("regFinItem: ", req);
    console.log("account: ", account);
    POST("/fin-item/reg", req).then((res: any) => {
      console.log(res);
      if (res.data.success) {
        alert("자산등록이 완료되었습니다.");
      }
    });
  };

  return (
    <div className="w-full overflow-x-auto mt-3">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <div className="text-l font-bold">계좌정보</div>
        </div>
      </div>
      <div className="w-full">
        <AccountInput addAccount={addAccount} user={user} />
        {accountList &&
          accountList.map((account: AccountProps, i: any) => (
            <div key={i} className="flex justify-between">
              <div className="flex">
                <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                  <Input
                    name="opsKind"
                    type="text"
                    width="w-20"
                    placeholder="BaroOps"
                    value={account?.opsKind}
                    onChange={handleChange}
                    readOnly={true}
                  />
                </InputWrapper>
                <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                  <CommonCodeSelect
                    width="w-25"
                    name="bankAccountType"
                    commonCode={CorpType}
                    value={account["bankAccountType"]}
                    disabled={true}
                    placeholder="기업유형"
                  />
                </InputWrapper>
                <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                  <CommonCodeSelect
                    name="bank"
                    onChange={handleChange}
                    value={account["bank"]}
                    commonCode={BaroBankCode}
                    disabled={true}
                    placeholder="은행선택"
                  />
                </InputWrapper>
                <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                  <Input
                    name="bankAccountNum"
                    type="text"
                    width="w-36"
                    placeholder="계좌번호"
                    value={account?.bankAccountNum}
                    onChange={handleChange}
                    readOnly={true}
                  />
                </InputWrapper>
                <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                  <CommonCodeSelect
                    name="useKind"
                    commonCode={UseKind}
                    value={account?.useKind}
                    placeholder="사용목적"
                    onChange={(e) =>
                      handleChangeUsePurpose({
                        ...account,
                        useKind: e.target.value,
                      })
                    }
                  />
                </InputWrapper>
              </div>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => regFinItem(account)}
                  className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  자산등록
                </button>
                <button
                  type="button"
                  onClick={() => syncAccountLog(account)}
                  className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  데이터수집
                </button>
                <button
                  type="button"
                  onClick={() => accountDetail()}
                  className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  상세보기
                </button>
                <button
                  type="button"
                  onClick={() => accountDelete(account)}
                  className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-gray-500 rounded-lg hover:bg-gray-600">
                  삭제
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
