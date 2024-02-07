import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {FiX} from "react-icons/fi";
import {TransMoneyProps} from "@/model/TransMoney";
import {finNumber} from "@/utils/finNumber";

type Props = {
  finData: TransMoneyProps[];
  category?: Record<string, string>;
  closedModal: (isSaved: boolean) => void;
  tradeKind: string;
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

const ModalFinStatus = ({finData, closedModal, tradeKind}: Props) => {
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
    if (finData.length > 0) {
      setIsOpen(true);
      classfyFinData(finData);
      calcEquity();
    }
  }, [finData]);

  const classfyFinData = (finData: TransMoneyProps[]) => {
    finData.forEach((data) => {
      finClassData[data.finClassCode].push(data);
    });
    console.log({finClassData});
  };

  const calcEquity = () => {
    const IN2 = finClassData.IN2.reduce((sum, cur) => {
      return (sum += cur.transMoney);
    }, 0);
    const OUT2 = finClassData.OUT2.reduce((sum, cur) => {
      return (sum += cur.transMoney);
    }, 0);
    const IN3 = finClassData.IN3.reduce((sum, cur) => {
      return (sum += cur.transMoney);
    }, 0);
    const OUT3 = finClassData.OUT3.reduce((sum, cur) => {
      return (sum += cur.transMoney);
    }, 0);
    console.log({IN2, OUT2, IN3, OUT3});
    setEquity(-IN2 + OUT2 + IN3 - OUT3);
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
              <div className="relative inline-block w-full max-w-md p-4 overflow-hidden text-left align-middle bg-white shadow-xl dark:bg-gray-700 dark:text-white transition-all transform rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-gray-900 dark:text-white">
                  재무현황
                </Dialog.Title>
                <button
                  className="absolute top-0 right-0 m-4 font-bold uppercase"
                  onClick={closeModal}>
                  <FiX size={18} className="stroke-current" />
                </button>
                <div className="flex">
                  <div className="w-full p-4 mt-1 m-1 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800 flex justify-between">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                      {tradeKind === "CASH" ? "수입" : "수익"}
                    </label>
                    <div>
                      <ul>
                        {finClassData.IN1.map((data) => (
                          <li
                            key={data.categoryName}
                            className="flex justify-between">
                            <label>{data.categoryName}</label>
                            <div className="w-32 text-right">
                              {finNumber(data.transMoney)}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full p-4 mt-1 m-1 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800 flex justify-between">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                      {tradeKind === "CASH" ? "지출" : "비용"}
                    </label>
                    <div>
                      <ul>
                        {finClassData.OUT1.map((data) => (
                          <li
                            key={data.categoryName}
                            className="flex justify-between">
                            <label>{data.categoryName}</label>
                            <div className="w-32 text-right">
                              {finNumber(data.transMoney)}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full p-4 mt-1 m-1 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800 flex justify-between">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                      자산
                    </label>
                    <div>
                      <ul>
                        {finClassData.IN3.map((data) => (
                          <li
                            key={data.categoryName}
                            className="flex justify-between">
                            <label>{data.categoryName}</label>
                            <div className="w-32 text-right">
                              {finNumber(data.transMoney)}
                            </div>
                          </li>
                        ))}
                        {finClassData.OUT3.map((data) => (
                          <li
                            key={data.categoryName}
                            className="flex justify-between">
                            <label>{data.categoryName}</label>
                            <div className="w-32 text-right">
                              {finNumber(data.transMoney * -1)}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full p-4 mt-1 m-1 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800 flex justify-between">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                      부채
                    </label>
                    <div>
                      <ul>
                        {finClassData.IN2.map((data) => (
                          <li
                            key={data.categoryName}
                            className="flex justify-between">
                            <label>{data.categoryName}</label>
                            <div className="w-32 text-right">
                              {finNumber(data.transMoney)}
                            </div>
                          </li>
                        ))}
                        {finClassData.OUT2.map((data) => (
                          <li
                            key={data.categoryName}
                            className="flex justify-between">
                            <label>{data.categoryName}</label>
                            <div className="w-32 text-right">
                              {finNumber(data.transMoney * -1)}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full p-4 mt-1 m-1 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800 flex justify-between">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                      자본
                    </label>
                    <div>
                      <ul>
                        <li className="flex justify-between">
                          <label></label>
                          <div className="w-32 text-right">
                            {finNumber(equity)}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalFinStatus;
