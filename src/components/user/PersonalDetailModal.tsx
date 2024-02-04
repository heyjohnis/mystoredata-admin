import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {FiX} from "react-icons/fi";
import {InputWrapper} from "@/components/forms/input-wrapper";
import {Label} from "@/components/forms/label";
import {Input} from "@/components/forms/input";
import {POST, PUT} from "@/utils/restApi";
import {UserProps} from "model/user";
import AccountList from "@/components/accounts/accountList";
import CardList from "@/components/cards/cardList";
import Link from "next/link";

const InitForm = {
  userType: "PERS",
  corpName: "마이스토어데이터(주)",
  corpNum: "5358703085",
};

const UserDetailModal = ({user, closedModal}: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form, setForm] = useState<UserProps>({...user, ...InitForm});
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
      setForm({...user, ...InitForm});
      setIsReadOnly(user.userId ? true : false);
    }
  }, [user]);

  const saveUser = () => {
    console.log("saveUser: ,", form);
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

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setForm((prevState: any) => ({...prevState, [name]: value}));
  };

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
                  개인사용자 상세정보
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
                      value={form?.email}
                      onChange={handleChange}
                      width="w-full"
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>사용자명</Label>
                    <Input
                      name="userName"
                      type="text"
                      value={form?.userName}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>휴대폰</Label>
                    <Input
                      name="mobile"
                      type="text"
                      value={form?.mobile}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                </div>
                <div className="flex">
                  <InputWrapper outerClassName="sm:col-span-12 mt-2">
                    <Label>생년월일</Label>
                    <Input
                      name="birth"
                      type="text"
                      value={form?.birth}
                      placeholder="YYMMDD"
                      onChange={handleChange}
                    />
                  </InputWrapper>
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
                      pathname: "/category-my",
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

export default UserDetailModal;
