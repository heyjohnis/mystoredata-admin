import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {FiX} from "react-icons/fi";
import {InputWrapper} from "components/forms/input-wrapper";
import {Label} from "components/forms/label";
import {Input} from "components/forms/input";
import {GET, POST, PUT} from "utils/restApi";
import {TransMoneyProps} from "model/TransMoney";
import {BankCode, CardCode, UsePurpose} from "data/commonCode";
import CommonCodeSelect, {CategorySelect} from "components/CommonCodeSelect";
import {CategoryProps} from "model/Category";
import Switch from "components/switch";
import {FinItemProps} from "model/FinItem";

type Props = {
  finItem: FinItemProps | null;
  category?: Record<string, string>;
  closedModal: (isSaved: boolean) => void;
};

const ModalFinItem = ({finItem, closedModal}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form, setForm] = useState<FinItemProps>();
  const [category, setCategory] = useState([]);
  const closeModal = () => {
    setIsOpen(false);
    closedModal(true);
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
    if (name === "category") {
      const selectedText = e.target.options[e.target.selectedIndex].text;
      setForm((prevState: any) => ({...prevState, categoryName: selectedText}));
    }
  };

  const updateDetail = () => {
    PUT(`trans/update/${form?._id}`, form)
      .then((res: any) => {
        console.log({res});
        if (res.data.n > 0) alert("저장되었습니다");
      })
      .catch((err) => {
        console.log({err});
      });
  };

  const setUseAsset = (useYn: boolean) => {
    console.log("setUseAsset: ", useYn);
    setForm((prevState: any) => ({...prevState, useYn}));
  };

  const saveRule = () => {
    POST(`user/category/rule`, form)
      .then((res: any) => {
        if (res.data.n > 0) alert("저장되었습니다");
        else alert("저장에 실패하였습니다");
      })
      .catch((err) => {
        console.log({err});
      });
  };

  useEffect(() => {
    console.log("form: ", finItem);
    console.log("updateDetail: ", finItem);
    updateDetail();
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
              <div className="relative inline-block w-full max-w-5xl p-4 overflow-hidden text-left align-middle bg-white shadow-xl dark:bg-gray-700 dark:text-white transition-all transform rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-gray-900 dark:text-white">
                  거래내역 상세정보
                </Dialog.Title>
                <button
                  className="absolute top-0 right-0 m-4 font-bold uppercase"
                  onClick={closeModal}>
                  <FiX size={18} className="stroke-current" />
                </button>
                <div className="flex">
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>사용여부</Label>
                    <Input name="useYn" type="text" onChange={handleChange} />
                  </InputWrapper>
                </div>
                <div className="flex mt-3 pt-3 border-t-2 justify-between">
                  <button
                    type="button"
                    className="px-4 py-2 text-xs font-bold text-white uppercase bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={saveRule}>
                    본 설정으로 모두 적용(향후 데이터 적옹)
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

export default ModalFinItem;
