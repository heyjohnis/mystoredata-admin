import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {FiX} from "react-icons/fi";
import {InputWrapper} from "@/components/ui/forms/input-wrapper";
import {Label} from "@/components/ui/forms/label";
import {Input} from "@/components/ui/forms/input";
import {POST, PUT} from "@/utils/restApi";
import {UserProps} from "@/model/user";
import AccountList from "@/components/accounts/accountList";
import CardList from "@/components/cards/cardList";
import Link from "next/link";
import CommonCodeSelect from "@/components/CommonCodeSelect";
import {CorpType} from "../../data/commonCode";

const CorpDetailModal = ({user, closedModal}: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form, setForm] = useState<UserProps>({...user, userType: "CORP"});
  const [searchYYYYMM, setSearchYYYYMM] = useState<string>(
    new Date().getFullYear() +
      "" +
      (new Date().getMonth() + 1).toString().padStart(2, "0")
  );
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const closeModal = () => {
    setIsOpen(false);
    closedModal();
  };

  useEffect(() => {
    if (user) {
      setIsOpen(true);
      setForm({...user, userType: "CORP"});
      setIsReadOnly(user.userId ? true : false);
    }
  }, [user]);

  const saveUser = () => {
    if (user.createdAt) {
      PUT("user/update", form).then((res: any) => {
        console.log("user update");
        console.log("res: ", res);
        closedModal(true);
        closeModal();
      });
    } else {
      POST("auth/signup", form).then((res: any) => {
        console.log("user create");
        if (res?.data) {
          console.log("res: ", res);
          closedModal(true);
          closeModal();
        }
      });
    }
  };

  const regHometaxInfo = () => {
    if (!form.hometaxID || !form.hometaxPWD) {
      alert("홈택스 ID와 패스워드를 입력해주세요.");
      return;
    }
    console.log("regHometaxInfo: ", form);
    POST("tax/reg", form).then((res: any) => {
      console.log("tax/reg: ", res);
    });
  };

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setForm((prevState: any) => ({...prevState, [name]: value}));
  };

  useEffect(() => {
    console.log("form: ", form);
  }, [form]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto w-full"
          onClose={closeModal}>
          <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0 bg-gray-900/25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <div className="relative inline-block w-full max-w-5xl p-4 overflow-hidden text-left align-middle bg-white shadow-xl dark:bg-gray-700 dark:text-white transition-all transform rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-gray-900 dark:text-white">
                  사업자 상세정보
                </Dialog.Title>
                <button
                  className="absolute top-0 right-0 m-4 font-bold uppercase"
                  onClick={closeModal}>
                  <FiX size={18} className="stroke-current" />
                </button>
                <div className="flex">
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>로그인ID</Label>
                    <Input
                      name="userId"
                      type="text"
                      width="w-28"
                      value={form?.userId}
                      onChange={handleChange}
                      readOnly={isReadOnly}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>패스워드</Label>
                    <Input
                      name="password"
                      type="password"
                      width="w-28"
                      value={form?.password}
                      onChange={handleChange}
                      readOnly={isReadOnly}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>이메일</Label>
                    <Input
                      name="email"
                      type="text"
                      width="w-60"
                      value={form?.email}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>사용자명</Label>
                    <Input
                      name="userName"
                      type="text"
                      width="w-28"
                      value={form?.userName}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>휴대폰</Label>
                    <Input
                      name="mobile"
                      type="text"
                      width="w-32"
                      value={form?.mobile}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-12 mt-2">
                    <Label>생년월일</Label>
                    <Input
                      name="birth"
                      type="text"
                      width="w-28"
                      value={form?.birth}
                      placeholder="YYMMDD"
                      onChange={handleChange}
                    />
                  </InputWrapper>
                </div>
                <div className="flex">
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>회사명</Label>
                    <Input
                      name="corpName"
                      type="text"
                      width="w-28"
                      value={form?.corpName}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>사업자번호</Label>
                    <Input
                      name="corpNum"
                      type="text"
                      width="w-28"
                      value={form?.corpNum}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>기업유형</Label>
                    <CommonCodeSelect
                      name="corpType"
                      commonCode={CorpType}
                      value={form["corpType"]}
                      onChange={handleChange}
                      placeholder="기업유형"
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>대표자명</Label>
                    <Input
                      name="ceoName"
                      type="text"
                      width="w-20"
                      value={form?.ceoName}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>업태</Label>
                    <Input
                      name="bizType"
                      type="text"
                      width="w-24"
                      value={form?.bizType}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>업종</Label>
                    <Input
                      name="bizClass"
                      type="text"
                      width="w-28"
                      value={form?.bizClass}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>주소</Label>
                    <Input
                      name="addr1"
                      type="text"
                      value={form?.addr1}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-12 mt-2">
                    <Label>상세주소</Label>
                    <Input
                      name="addr2"
                      type="text"
                      value={form?.addr2}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                </div>

                <div className="flex">
                  <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
                    <Label>홈택스ID</Label>
                    <Input
                      name="hometaxID"
                      type="text"
                      value={form?.hometaxID}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
                    <Label>홈택스 패스워드</Label>
                    <Input
                      name="hometaxPWD"
                      type="password"
                      value={form?.hometaxPWD || ""}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                  <button
                    type="button"
                    onClick={regHometaxInfo}
                    className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                    홈택스등록
                  </button>
                </div>
                <div className="flex">
                  <InputWrapper outerClassName="sm:col-span-12 mt-2">
                    <Label>데이터수집 기간설정(연월)</Label>
                    <Input
                      name="addr2"
                      type="text"
                      value={searchYYYYMM}
                      placeholder="YYYYMM"
                      onChange={(e) => setSearchYYYYMM(e.target.value)}
                    />
                  </InputWrapper>
                </div>

                <AccountList
                  accounts={form?.accounts}
                  user={user}
                  baseMonth={searchYYYYMM}
                />
                <CardList
                  cards={form?.cards}
                  user={user}
                  baseMonth={searchYYYYMM}
                />

                <div className="flex mt-3 pt-3 border-t-2 justify-between">
                  <Link
                    href={{
                      pathname: "/admin/category-my",
                      query: {user: form._id},
                    }}>
                    <button
                      type="button"
                      className="px-4 py-2 text-xs font-bold text-white uppercase bg-gray-500 rounded-lg hover:bg-gray-600">
                      카테고리 설정
                    </button>
                  </Link>

                  <button
                    type="button"
                    onClick={saveUser}
                    className="px-4 py-2 text-xs font-bold text-white uppercase bg-blue-500 rounded-lg hover:bg-blue-600">
                    저장
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CorpDetailModal;
