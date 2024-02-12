import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {FiX} from "react-icons/fi";
import {InputWrapper} from "@/components/ui/forms/input-wrapper";
import {Label} from "@/components/ui/forms/label";
import {Input} from "@/components/ui/forms/input";
import {GET, POST, PUT} from "@/utils/restApi";
import {TransMoneyProps} from "@/model/TransMoney";
import {
  BaroBankCode,
  CardCode,
  UseKind,
  FinClassCode,
  FinItemCode,
} from "@/data/commonCode";
import CommonCodeSelect, {CategorySelect} from "@/components/CommonCodeSelect";
import {CategoryProps} from "@/model/Category";
import Switch from "@/components/ui/switch";

type Props = {
  asset: TransMoneyProps | null;
  category?: Record<string, string>;
  closedModal: (isSaved?: boolean) => void;
};

const ModalTransMoney = ({asset, closedModal}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form, setForm] = useState<TransMoneyProps>();
  const [personalCategory, setPersonalCategory] = useState<CategoryProps[]>([]);
  const [corpCategory, setCorpCategory] = useState<CategoryProps[]>([]);
  const [userCategory, setUserCategory] = useState<CategoryProps[]>([]);
  const closeModal = () => {
    setIsOpen(false);
    closedModal(
      asset?.category !== form?.category ||
        asset?.useKind !== form?.useKind ||
        asset?.useYn !== form?.useYn
    );
  };
  useEffect(() => {
    if (asset) {
      setIsOpen(true);
      setForm(asset);
      getCategory(asset);
    }
  }, [asset]);

  const getCategory = async (asset: TransMoneyProps) => {
    console.log("getCategory: ", asset);
    const {data}: any = await GET(`/user/category/${asset.user}`);
    setPersonalCategory(data.personalCategory);
    setCorpCategory(data.corpCategory);
    setUserCategory(data.userCategory || []);
    console.log("category: ", asset.category);
  };

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setForm((prevState: any) => ({...prevState, [name]: value}));
    if (name === "category") {
      const selectedText = e.target.options[e.target.selectedIndex].text;
      setForm((prevState: any) => ({...prevState, categoryName: selectedText}));
    }
    if (name === "finClassCode") {
      const selectedText = e.target.options[e.target.selectedIndex].text;
      setForm((prevState: any) => ({...prevState, finClassName: selectedText}));
    }
  };

  const updateDetail = () => {
    PUT(`/trans/update/${form?._id}`, form)
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
    POST(`/user/category/rule`, form)
      .then((res: any) => {
        if (res.data.n > 0) alert("저장되었습니다");
        else alert("저장에 실패하였습니다");
      })
      .catch((err) => {
        console.log({err});
      });
  };

  const saveEmpPay = () => {
    POST(`/emp/reg`, form)
      .then((res: any) => {
        console.log("save employee: ", res);
        if (res?.status === 200) {
          closedModal(true);
          alert("저장되었습니다");
        }
      })
      .catch((err) => {
        console.log({err});
      });
  };
  const saveDebt = (type: string) => {
    console.log("saveDebt: ", type);
    const req = {
      ...form,
      finItemCode: type,
      finItemName: FinItemCode[type],
      finName: form?.transRemark,
    };
    POST(`/debt/trans/reg`, req)
      .then((res: any) => {
        console.log("save loan: ", res);
        if (res?.status === 200) {
          closedModal(true);
          alert("저장되었습니다");
        }
      })
      .catch((err) => {
        console.log({err});
      });
  };
  const saveAsset = (type: string) => {
    console.log("saveAsset: ", type);
    const req = {
      ...form,
      finItemCode: type,
      finItemName: FinItemCode[type],
      finName: form?.transRemark,
    };
    POST(`/asset/trans/reg`, req)
      .then((res: any) => {
        console.log("save asset: ", res);
        if (res?.status === 200) {
          closedModal(true);
          alert("저장되었습니다");
        }
      })
      .catch((err) => {
        console.log({err});
      });
  };

  useEffect(() => {
    console.log("form: ", form);
    if (
      form?.category !== asset?.category ||
      form?.useKind !== asset?.useKind ||
      form?.useYn !== asset?.useYn ||
      form?.finClassCode !== asset?.finClassCode
    ) {
      console.log("updateDetail: ", form);
      updateDetail();
    }
  }, [form]);

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
                      value={form?.transDate?.toString() || ""}
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
                      value={`${
                        form?.bank ? BaroBankCode[form?.bank || ""] : ""
                      } ${form?.bankAccountNum || ""}`}
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
                      value={form?.transMoney?.toLocaleString("ko-KR") || ""}
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>사용목적</Label>
                    <CommonCodeSelect
                      name="useKind"
                      value={form?.useKind}
                      commonCode={UseKind}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>카테고리</Label>
                    {corpCategory.length > 0 && (
                      <CategorySelect
                        name="category"
                        value={form?.category}
                        codes={
                          form?.useKind === "BIZ"
                            ? [...corpCategory, ...userCategory]
                            : [...personalCategory, ...userCategory] || []
                        }
                        onChange={handleChange}
                      />
                    )}
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>거래구분</Label>
                    <CommonCodeSelect
                      name="finClassCode"
                      value={form?.finClassCode}
                      commonCode={FinClassCode}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>키워드</Label>
                    <Input
                      name="transMoney"
                      type="text"
                      width="w-96"
                      value={form?.keyword?.join(", ") || ""}
                      onChange={handleChange}
                      readOnly={true}
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
                  <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                    <Label>사용여부</Label>
                    <Switch
                      bgColor={"bg-gray-400"}
                      initialState={form?.useYn}
                      setSwitch={setUseAsset}
                    />
                  </InputWrapper>
                </div>
                <div className="flex mt-3 pt-3 border-t-2 justify-between">
                  <button
                    type="button"
                    className="px-4 py-2 text-xs font-bold text-white uppercase bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={saveRule}>
                    본 설정으로 모두 적용(향후 데이터 적옹)
                  </button>
                  <div>
                    <button
                      type="button"
                      className="ml-2 px-4 py-2 text-xs font-bold text-white uppercase bg-red-500 rounded-lg hover:bg-red-600"
                      onClick={saveEmpPay}>
                      급여로 처리
                    </button>
                    <button
                      type="button"
                      className="ml-2 px-4 py-2 text-xs font-bold text-white uppercase bg-orange-500 rounded-lg hover:bg-orange-600"
                      onClick={() => saveAsset("LOAN")}>
                      대여금(빌려준 돈)으로 처리
                    </button>
                    <button
                      type="button"
                      className="ml-2 px-4 py-2 text-xs font-bold text-white uppercase bg-orange-500 rounded-lg hover:bg-orange-600"
                      onClick={() => saveDebt("BORR")}>
                      차입금(빌린 돈)으로 처리
                    </button>
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

export default ModalTransMoney;
