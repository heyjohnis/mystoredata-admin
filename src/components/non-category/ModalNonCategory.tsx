import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {FiX} from "react-icons/fi";
import {InputWrapper} from "components/forms/input-wrapper";
import {Label} from "components/forms/label";
import {Input} from "components/forms/input";
import {NonCategoryProps} from "model/NonCategory";
import {useDebouncedCallback} from "use-debounce";
import {CategorySelect} from "components/CommonCodeSelect";
import {CategoryProps} from "model/Category";
import {GET, PUT} from "utils/restApi";

type Props = {
  nonCategory?: NonCategoryProps;
  closedModal: (isChanged: boolean) => void;
};

const ModalNonCategory = ({nonCategory, closedModal}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form, setForm] = useState<NonCategoryProps>();
  const [category, setCategory] = useState<CategoryProps>();
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  const closeModal = () => {
    setIsOpen(false);
    closedModal(isChanged);
  };

  const getCategories: any = async () => {
    const {data}: any = await GET(`category/keyword-rule`);
    setCategories(data);
  };

  // const debounced = useDebouncedCallback((value) => {
  //   saveCategorKeywords();
  // }, 1000);

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    console.log("handleChange: ", name, value);
    setForm((prevState: any) => ({...prevState, [name]: value}));
    // debounced(e.target.value);
  };

  useEffect(() => {
    console.log({nonCategory});
    if (nonCategory) {
      setIsOpen(true);
      setForm({...nonCategory});
      getCategories();
    }
  }, [nonCategory]);

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
                  미분류 카테고리 상세정보
                </Dialog.Title>
                <button
                  className="absolute top-0 right-0 m-4 font-bold uppercase"
                  onClick={closeModal}>
                  <FiX size={18} className="stroke-current" />
                </button>
                <div className="flex">
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>카테고리명</Label>
                    <Input
                      name="code"
                      type="text"
                      width="w-48"
                      value={form?._id}
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </InputWrapper>

                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>일괄변경</Label>
                    <CategorySelect
                      name="category"
                      onChange={handleChange}
                      codes={categories}
                    />
                  </InputWrapper>
                </div>
                <div className="flex"></div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalNonCategory;
