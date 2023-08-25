import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {FiX} from "react-icons/fi";
import {InputWrapper} from "components/forms/input-wrapper";
import {Label} from "components/forms/label";
import {Input} from "components/forms/input";
import {GET} from "utils/restApi";
import {UserProps} from "model/user";
import AccountList from "components/accounts/accountList";
import CardList from "components/cards/cardList";
import Link from "next/link";
import {TransMoneyProps} from "model/TransMoney";
import {BankCode, CardCode, UsePurpose} from "data/commonCode";
import CommonCodeSelect from "components/CommonCodeSelect";

type Props = {
  asset?: TransMoneyProps;
  category?: Record<string, string>;
  closedModal: (isSaved?: boolean) => void;
};

const ModalTransMoney = ({asset, closedModal}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form, setForm] = useState<TransMoneyProps>();
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const [category, setCategory] = useState<Record<string, string>>({});

  const closeModal = () => {
    setIsOpen(false);
    closedModal();
  };
  useEffect(() => {
    if (asset) {
      setIsOpen(true);
      setForm(asset);
      getCategory(asset);
    }
  }, [asset]);

  const getCategory = async (asset: TransMoneyProps) => {
    const result = await GET(`user/category/${asset.user}`);
    const obj = result?.data?.data?.category;
    console.log({obj});
    const categoryData: {[key: string]: any} = {};
    for (const key in obj) {
      categoryData[key] = obj[key].name;
    }
    setCategory(categoryData);
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
                  거래내역 상세정보
                </Dialog.Title>
                <button
                  className="absolute top-0 right-0 m-4 font-bold uppercase"
                  onClick={closeModal}>
                  <FiX size={18} className="stroke-current" />
                </button>
                <div className="flex">
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>거래일</Label>
                    <Input
                      name="transDate"
                      type="text"
                      width="w-48"
                      value={form?.transDate.toString() || ""}
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>사업자</Label>
                    <Input
                      name="corpNum"
                      type="text"
                      value={form?.corpNum || ""}
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>계좌번호</Label>
                    <Input
                      name="bankAccountNum"
                      type="text"
                      width="w-48"
                      value={`${form?.bank ? BankCode[form?.bank || ""] : ""} ${
                        form?.bankAccountNum || ""
                      }`}
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>카드번호</Label>
                    <Input
                      name="cardNum"
                      type="text"
                      width="w-64"
                      value={`${
                        form?.cardCompany ? CardCode[form?.cardCompany] : ""
                      } ${form?.cardNum || ""}`}
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </InputWrapper>
                </div>
                <div className="flex">
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>거래금액</Label>
                    <Input
                      name="transMoney"
                      type="text"
                      className="text-right"
                      value={form?.transMoney.toLocaleString("ko-KR") || ""}
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>사용목적</Label>
                    <CommonCodeSelect
                      name="useKind"
                      value={form?.useKind}
                      commonCode={UsePurpose}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>카테고리</Label>
                    <CommonCodeSelect
                      name="category"
                      value={form?.category}
                      commonCode={category}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                </div>
                <div className="flex">
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>통장내역</Label>
                    <Input
                      name="transMoney"
                      type="text"
                      width="w-96"
                      value={`${form?.transRemark || ""} ${
                        form?.transType ? "|" : ""
                      } ${form?.transType || ""} ${
                        form?.transOffice ? "|" : ""
                      } ${form?.transOffice || ""} `}
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>카드내역</Label>
                    <Input
                      name="transMoney"
                      type="text"
                      width="w-96"
                      value={`${form?.useStoreBizType || ""} ${
                        form?.useStoreName ? "|" : ""
                      } ${form?.useStoreName || ""}`}
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </InputWrapper>
                </div>
                <div className="flex">
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>카드내역</Label>
                    <Input
                      name="transMoney"
                      type="text"
                      width="w-96"
                      value={`${form?.useStoreBizType || ""} ${
                        form?.useStoreName ? "|" : ""
                      } ${form?.useStoreName || ""}`}
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>결제결과</Label>
                    <Input
                      name="cardApprovalType"
                      type="text"
                      width="w-32"
                      value={form?.cardApprovalType}
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>결제방법</Label>
                    <Input
                      name="paymentPlan"
                      type="text"
                      width="w-32"
                      value={form?.paymentPlan}
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </InputWrapper>
                </div>
                <div className="flex mt-3 pt-3 border-t-2 justify-between">
                  <button
                    type="button"
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

export default ModalTransMoney;