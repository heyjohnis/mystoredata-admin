import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {FiX} from "react-icons/fi";
import {InputWrapper} from "@/components/forms/input-wrapper";
import {Label} from "@/components/forms/label";
import {Input} from "@/components/forms/input";
import CommonCodeSelect, {CategorySelect} from "@/components/CommonCodeSelect";
import {FinItemProps} from "model/FinItemProps";
import {BankCorpCode, FinItemCode} from "@/data/commonCode";
import {Select} from "@/components/forms/select";

type Props = {
  finItem: FinItemProps;
  category?: Record<string, string>;
  closedModal: (isSaved: boolean) => void;
  saveItem: (finItem: FinItemProps) => void;
  deleteItem: (finItem: FinItemProps) => void;
};

const ModalFinItem = ({finItem, closedModal, saveItem, deleteItem}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form, setForm] = useState<FinItemProps>(finItem);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const closeModal = () => {
    console.log("close modal");
    setIsOpen(false);
    closedModal(isChanged);
  };
  useEffect(() => {
    if (finItem._id) {
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
                  <InputWrapper outerClassName="sm:col-span-6 mt-2 mr-2">
                    <Label>ID</Label>
                    <Input
                      name="userId"
                      type="text"
                      disabled={true}
                      value={form?._id}
                    />
                  </InputWrapper>
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
                </div>
                <div className="flex">
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
                    <Label>재무분류</Label>
                    <CommonCodeSelect
                      name="itemType"
                      value={form?.finItemCode}
                      commonCode={FinItemCode}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                </div>
                <div className="flex">
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
                    <Label>설정일(초기일)</Label>
                    <Input
                      name="defaultDate"
                      type="date"
                      onChange={handleChange}
                      value={form?.defaultDate.toString().substring(0, 10)}
                    />
                  </InputWrapper>
                </div>
                <div className="flex">
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>원금(초기값)</Label>
                    <Input
                      name="amount"
                      type="text"
                      onChange={handleChange}
                      value={(form?.amount || 0).toLocaleString()}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>현재평가액</Label>
                    <Input
                      name="currentAmount"
                      type="text"
                      onChange={handleChange}
                      value={(form?.currentAmount || 0).toLocaleString()}
                      disabled={form?.isFixed}
                    />
                  </InputWrapper>
                </div>
                <div className="flex mt-3 pt-3 border-t-2 justify-between">
                  <button
                    type="button"
                    className="px-4 py-2 text-xs font-bold text-white uppercase bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={() => saveItem(form)}>
                    저장
                  </button>
                  {!form?.isFixed && form?.user && (
                    <button
                      type="button"
                      className="px-4 py-2 text-xs font-bold text-white uppercase bg-red-500 rounded-lg hover:bg-red-600"
                      onClick={() => deleteItem(form)}>
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
