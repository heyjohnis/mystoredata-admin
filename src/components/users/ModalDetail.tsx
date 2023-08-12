import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState, PropsWithChildren, use} from "react";
import {FiX} from "react-icons/fi";
import {InputWrapper} from "components/forms/input-wrapper";
import {Label} from "components/forms/label";
import {ErrorMessage} from "components/forms/error-message";
import {SuccessMessage} from "components/forms/success-message";
import {Hint} from "components/forms/hint";
import {Input} from "components/forms/input";
import {Textarea} from "components/forms/textarea";
import {Select} from "components/forms/select";
import {Checkbox} from "components/forms/checkbox";
import {Radio} from "components/forms/radio";


const Modal = ( { user, closedModal }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsOpen(false);
    closedModal();
  }

  useEffect(() => {
    if (user) {
      setIsOpen(true);
    }
  }, [user]);

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
              <div className="relative inline-block w-full max-w-lg p-4 overflow-hidden text-left align-middle bg-white shadow-xl dark:bg-gray-700 dark:text-white transition-all transform rounded-2xl space-y-4">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-gray-900 dark:text-white">
                  사용자 상세정보
                </Dialog.Title>
                <button
                  className="absolute top-0 right-0 m-4 font-bold uppercase"
                  onClick={closeModal}>
                  <FiX size={18} className="stroke-current" />
                </button>
                <div>
                <InputWrapper inline={true} outerClassName="sm:col-span-12">
                  <Label>로그인ID</Label>
                  <Input name="name" type="text" width="w-100" value={user?.userId}  />
                </InputWrapper>
                <InputWrapper inline={true} outerClassName="sm:col-span-12">
                  <Label>사용자명</Label>
                  <Input name="name" type="text" width="w-64" value={user?.name}  />
                </InputWrapper>
                  <Label>회사명</Label>
                  <Input name="name" type="text" width="w-64" value={user?.corpName}  />
                <InputWrapper inline={true} outerClassName="sm:col-span-12">
                  <Label>사업자번호</Label>
                  <Input name="name" type="text" width="w-64" value={user?.corpNum}  />
                </InputWrapper>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Donec eu libero sit amet quam egestas semper. Aenean ultricies
                  mi vitae est. Mauris placerat eleifend leo.
                </p>

                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-xs font-bold text-white uppercase bg-blue-500 rounded-lg hover:bg-blue-600">
                  Close modal
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
