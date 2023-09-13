import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {FiX} from "react-icons/fi";
import {InputWrapper} from "components/forms/input-wrapper";
import {Label} from "components/forms/label";
import {Input} from "components/forms/input";
import {GET, POST, PUT, DELETE} from "utils/restApi";
import {TransMoneyProps} from "model/TransMoney";
import CommonCodeSelect, {CategorySelect} from "components/CommonCodeSelect";
import {CategoryProps} from "model/Category";
import Switch from "components/switch";
import {FinItemProps} from "model/FinItem";
import {BankCorpCode, FinItemCode} from "data/commonCode";
import {Select} from "components/forms/select";

type Props = {
  finItem: FinItemProps | null;
  category?: Record<string, string>;
  closedModal: (isSaved: boolean) => void;
};

const ModalFinItem = ({finItem, closedModal}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form, setForm] = useState<FinItemProps>();
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const closeModal = () => {
    console.log("close modal");
    setIsOpen(false);
    closedModal(isChanged);
  };
  useEffect(() => {
    if (finItem) {
      setIsOpen(true);
      setForm(finItem);
    }
  }, [finItem]);

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setForm((prevState: any) => ({...prevState, [name]: value}));
    if (name === "itemType") {
      setForm((prevState: any) => ({
        ...prevState,
        itemTypeName: FinItemCode[value],
      }));
    }
  };

  const saveFinItemInfo = () => {
    if (!form?._id) {
      POST("fin-item/reg", form)
        .then((res: any) => {
          if (res?.data) {
            setForm(res.data);
            setIsChanged(true);
            alert("저장되었습니다");
            closedModal(true);
          } else {
            alert("저장에 실패하였습니다");
          }
        })
        .catch((err) => {
          console.log({err});
          alert("저장에 실패하였습니다" + err.toString());
        });
    } else {
      console.log("update: ", form);
      PUT(`fin-item/update/${form?._id}`, form)
        .then((res: any) => {
          console.log({res});
          setIsChanged(true);
          alert("저장되었습니다");
        })
        .catch((err) => {
          console.log({err});
        });
    }
  };

  const deleteFinItemInfo = () => {
    if (form?._id) {
      const isDelete: boolean = window.confirm("삭제하시겠습니까?");
      if (!isDelete) return;
      DELETE(`fin-item/delete/${form?._id}`)
        .then((res: any) => {
          console.log({res});
          setIsChanged(true);
          alert("삭제되었습니다");
        })
        .catch((err) => {
          console.log({err});
        });
    }
  };

  useEffect(() => {
    console.log("form: ", finItem);
    console.log("updateDetail: ", finItem);
  }, [finItem]);

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
              <div className="relative inline-block w-full max-w-2xl p-4 overflow-hidden text-left align-middle bg-white shadow-xl dark:bg-gray-700 dark:text-white transition-all transform rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-gray-900 dark:text-white">
                  자산, 부채 상세
                </Dialog.Title>
                <button
                  className="absolute top-0 right-0 m-4 font-bold uppercase"
                  onClick={closeModal}>
                  <FiX size={18} className="stroke-current" />
                </button>
                <div className="flex">
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>사용자</Label>
                    <Input
                      name="userId"
                      type="text"
                      onChange={handleChange}
                      disabled={!!form?._id}
                      value={form?.userId}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>재무구분</Label>
                    <Select
                      name="itemKind"
                      onChange={handleChange}
                      value={form?.itemKind}
                      options={[
                        {key: "ASSET", value: "자산"},
                        {key: "LIABILITY", value: "부채"},
                      ]}
                      disabled={form?.isFixed}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>금융사</Label>
                    <CommonCodeSelect
                      name="corpCode"
                      value={form?.finCorpCode}
                      commonCode={BankCorpCode}
                      onChange={handleChange}
                      disabled={form?.isFixed}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>재무분류</Label>
                    <CommonCodeSelect
                      name="itemType"
                      value={form?.itemType}
                      commonCode={FinItemCode}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                </div>
                <div className="flex">
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>계좌번호</Label>
                    <Input
                      name="accountNum"
                      type="text"
                      onChange={handleChange}
                      disabled={form?.isFixed}
                      value={form?.accountNum}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>이름</Label>
                    <Input
                      name="itemName"
                      type="text"
                      onChange={handleChange}
                      value={form?.itemName}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>현재평가액</Label>
                    <Input
                      name="amount"
                      type="text"
                      onChange={handleChange}
                      value={form?.amount.toLocaleString()}
                      disabled={form?.isFixed}
                    />
                  </InputWrapper>
                </div>
                <div className="flex mt-3 pt-3 border-t-2 justify-between">
                  <button
                    type="button"
                    className="px-4 py-2 text-xs font-bold text-white uppercase bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={saveFinItemInfo}>
                    저장
                  </button>
                  {!form?.isFixed && form?.user && (
                    <button
                      type="button"
                      className="px-4 py-2 text-xs font-bold text-white uppercase bg-red-500 rounded-lg hover:bg-red-600"
                      onClick={deleteFinItemInfo}>
                      삭제
                    </button>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalFinItem;
