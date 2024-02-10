import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {FiX} from "react-icons/fi";
import {TransMoneyProps} from "@/model/TransMoney";
import {finNumber} from "@/utils/finNumber";
import {dateToString, formatDateToTimezonePattern} from "@/utils/date";
import {BaroBankCode, FinClassCode, UseKind} from "@/data/commonCode";
import {CardCode} from "@/data/commonCode";
import {cardNumberSecurity} from "@/utils/security";
import {PopupProps} from "./TradeStatus";
import {set} from "nprogress";

type Props = {
  popupData: PopupProps;
  closedModal: (isSaved: boolean) => void;
};

type CategoryProps = {
  finClassCode?: string;
  category?: string;
  categoryName?: string;
  transMoney?: number;
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

export function ModalTradeCategoryItems({popupData, closedModal}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryProps>();
  const [logs, setLogs] = useState<TransMoneyProps[]>([]);
  const closeModal = () => {
    console.log("close modal");
    setIsOpen(false);
    closedModal(isChanged);
  };

  useEffect(() => {
    if ((popupData?.logs?.length || 0) > 0) {
      setIsOpen(true);
      console.log("popupData: ", popupData);
      setCategory(popupData?.category);
      setLogs(popupData?.logs || []);
    }
  }, [popupData]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto w-full h-full"
          onClose={closeModal}>
          <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-100">
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
              <div className="w-full min-h-screen p-6 overflow-hidden text-left align-middle bg-gray-50 shadow-xl dark:bg-gray-700 dark:text-white transition-all transform">
                <div className="sticky top-0">
                  <button
                    className="absolute top-0 right-0 p-4 font-bold uppercase"
                    onClick={closeModal}>
                    <FiX size={18} className="stroke-current" />
                  </button>
                  <div className="my-6 flex justify-between">
                    <div>
                      <div className="h-6 w-full">
                        {FinClassCode[category?.finClassCode || " "]}{" "}
                      </div>
                      <h2 className="text-2xl font-bold">
                        {category?.categoryName}
                      </h2>
                    </div>
                    <div className="text-2xl flex justify-center place-items-end font-bold">
                      {finNumber(category?.transMoney || 0)}
                    </div>
                  </div>
                </div>
                <div>
                  {logs.map((log) => {
                    return (
                      <div key={log._id} className="my-2 border-b pt-2 pb-4">
                        <div className="flex justify-between">
                          <div>
                            <div>
                              {formatDateToTimezonePattern(
                                new Date(log?.transDate)
                              )}
                            </div>
                            <div className="text-xl font-bold">
                              {log.useStoreName || log.transRemark}
                            </div>
                          </div>
                          <div className="flex place-items-end text-xl font-bold">
                            {finNumber(log.transMoney)}
                          </div>
                        </div>
                        <div className="h-0 overflow-hidden">
                          {log?.cardCompany && (
                            <div>
                              {CardCode[log?.cardCompany || ""]}{" "}
                              {cardNumberSecurity(log.cardNum)}
                            </div>
                          )}
                          {log?.bank && (
                            <div>
                              {BaroBankCode[log?.bank || ""]}{" "}
                              {log.bankAccountNum}
                            </div>
                          )}
                          <div>{UseKind[log.useKind]}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
