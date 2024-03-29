import {useEffect, useState} from "react";
import {POST} from "@/utils/restApi";
import SearchForm from "@/components/SearchForm";
import SectionTitle from "@/components/sample/dashboard/section-title";
import Notification from "@/components/sample/dashboard/notification";
import Widget from "@/components/ui/widget";
import {SearchProps} from "@/model/SearchForm";
import TransMoneyLog from "@/components/trans-money/TransMoneyLog";
import {TransMoneyProps} from "@/model/TransMoney";
import {FinItemProps} from "@/model/FinItemProps";
import {finNumber} from "@/utils/finNumber";
import ModalFinItem from "@/components/fin-item/ModalFinItem";

const fields: Record<string, string>[] = [
  {
    name: "사용자",
    key: "userId",
  },
  {
    name: "코드",
    key: "tradeType",
  },
  {
    name: "카테고리",
    key: "debtName",
  },
  {
    name: "부채이름",
    key: "debtName",
  },
  {
    name: "설정일(초기값)",
    key: "defaultDate",
  },
  {
    name: "원금(초기값)",
    key: "amount",
  },
  {
    name: "설정",
    key: "button",
  },
];

const initFinItem: FinItemProps = {
  _id: "",
  user: "",
  userId: "",
  corpNum: "",
  corpName: "",
  card: "",
  finItemName: "",
  finItemCode: "",
  finName: "",
  transRemark: "",
  useYn: true,
  defaultDate: new Date(),
  amount: 0,
  itemType: "",
  itemTypeName: "",
  account: "",
  itemKind: "",
  itemKindName: "",
  finCorpCode: "",
  finCorpName: "",
  itemName: "",
  accountNum: "",
  currentAmount: 0,
  isFixed: false,
  category: "",
  categoryName: "",
};

const Index: React.FC = () => {
  const [form, setForm] = useState<SearchProps>({});
  const [debts, setDebts] = useState<FinItemProps[]>([]);
  const [finItem, setFinItem] = useState<FinItemProps>(initFinItem);
  const [transMoneylogs, setTransMoneyLogs] = useState<TransMoneyProps[]>([]);
  const [asset, setAsset] = useState<TransMoneyProps | null>(null);

  useEffect(() => {
    getTradeDebtList();
  }, [form]);

  const getTradeDebtList = () => {
    POST(`/debt/list`, form).then((res: any) => {
      console.log({res});
      setDebts(res.data);
    });
  };

  const getLogs = (debt: string, userId: string) => {
    POST(`/trans/debt-log`, {userId, debt}).then((res: any) => {
      console.log({res});
      setTransMoneyLogs(res.data);
    });
  };

  const openModal = (e: React.MouseEvent, asset: FinItemProps) => {
    e.stopPropagation();
    setFinItem(asset);
    console.log("openModal", asset);
  };

  const closedModal = (isChanged: boolean) => {
    console.log("closedModal");
    setFinItem(initFinItem);
  };

  const saveInfo = (finItem: FinItemProps) => {
    let apiUrl = "/debt/reg";
    if (finItem._id) apiUrl = "/debt/save";
    console.log("saveInfo", apiUrl);
    POST(apiUrl, finItem).then((res: any) => {
      console.log({res});
      getTradeDebtList();
      getLogs(finItem._id, finItem.userId);
    });
    closedModal(true);
  };

  const deleteItem = (finItem: FinItemProps) => {
    POST(`/debt/delete`, finItem).then((res: any) => {
      console.log({res});
      getTradeDebtList();
      getLogs(finItem._id, finItem.userId);
      closedModal(true);
    });
  };

  return (
    <>
      <Notification />
      <SectionTitle
        title="Debt Info"
        subtitle="부채 정보"
        buttonName="항목추가"
        handleEvent={() =>
          setFinItem((prev: FinItemProps) => ({
            ...prev,
            userId: form?.userId || "",
          }))
        }
      />
      <Widget>
        <SearchForm form={form} handleChange={setForm} />
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                {fields.map((field, i) => (
                  <th
                    key={i}
                    className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase border-b border-gray-100 dark:border-gray-800 leading-4">
                    {field.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {debts &&
                debts.map((debt, i) => (
                  <tr
                    key={i}
                    className={`${
                      !debt.useYn && "line-through text-gray-400"
                    } cursor-pointer`}
                    onClick={() => getLogs(debt._id, debt.userId)}>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {debt.corpNum} {debt.corpName} ({debt.userId})
                    </td>

                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {debt.finItemCode}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {debt.finItemName}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {debt.finName}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {new Date(debt?.defaultDate).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-right">
                      {(debt?.amount || 0).toLocaleString()} 원
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      <button
                        type="button"
                        className="ml-2 px-4 py-2 text-xs font-bold text-white uppercase bg-orange-500 rounded-lg hover:bg-orange-600"
                        onClick={(event: React.MouseEvent) =>
                          openModal(event, debt)
                        }>
                        설정
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Widget>
      <Widget>
        <h3 className="m-2 text-lg font-bold	">거래내역</h3>
        <TransMoneyLog logs={transMoneylogs} setData={setAsset} />
      </Widget>
      <ModalFinItem
        finItem={finItem}
        closedModal={closedModal}
        saveItem={saveInfo}
        deleteItem={deleteItem}
      />
    </>
  );
};
export default Index;
