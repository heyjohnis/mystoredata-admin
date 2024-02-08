import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {FiX} from "react-icons/fi";
import {TransMoneyProps} from "@/model/TransMoney";
import {finNumber} from "@/utils/finNumber";
import {dateToString} from "@/utils/date";
import {BaroBankCode} from "@/data/commonCode";
import {CardCode} from "@/data/commonCode";
import {cardNumberSecurity} from "@/utils/security";
type Props = {
  logs?: any;
  closedModal: (isSaved: boolean) => void;
};

const finClassData: {
  [key: string]: TransMoneyProps[];
} = {
  IN1: [],
  IN2: [],
  IN3: [],
  OUT1: [],
  OUT2: [],
  OUT3: [],
};

export function ModalTradeCategoryItems({logs, closedModal}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [equity, setEquity] = useState<number>(0);
  const closeModal = () => {
    console.log("close modal");
    setIsOpen(false);
    closedModal(isChanged);
    finClassData.IN1 = [];
    finClassData.IN2 = [];
    finClassData.IN3 = [];
    finClassData.OUT1 = [];
    finClassData.OUT2 = [];
    finClassData.OUT3 = [];
    setEquity(0);
  };

  useEffect(() => {
    console.log("finData: ", logs);
  }, [logs]);

  const classfyFinData = (finData: TransMoneyProps[]) => {
    finData.forEach((data) => {
      finClassData[data.finClassCode].push(data);
    });
    console.log({finClassData});
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
              <div className="relative inline-block w-full max-w-md p-4 overflow-hidden text-left align-middle bg-gray-50 shadow-xl dark:bg-gray-700 dark:text-white transition-all transform rounded-2xl">
                <button
                  className="absolute top-0 right-0 m-4 font-bold uppercase"
                  onClick={closeModal}>
                  <FiX size={18} className="stroke-current" />
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function FinItem({data}: {data: TransMoneyProps}) {
  return (
    <li className="flex justify-between">
      <label className="text-right">{data.categoryName}</label>
      <div className="w-24 text-right">{finNumber(data.transMoney)}</div>
    </li>
  );
}
