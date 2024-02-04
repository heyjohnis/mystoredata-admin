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
};

const Index: React.FC = () => {
  const [form, setForm] = useState<SearchProps>({});
  const [assets, setAssts] = useState<FinItemProps[]>([]);
  const [finItem, setFinItem] = useState<FinItemProps>(initFinItem);
  const [transMoneylogs, setTransMoneyLogs] = useState<TransMoneyProps[]>([]);
  const [asset, setAsset] = useState<TransMoneyProps | null>(null);

  useEffect(() => {
    getTradeCorpList();
  }, [form]);

  const getTradeCorpList = () => {
    POST(`/asset/list`, form).then((res: any) => {
      console.log({res});
      setAssts(res.data);
    });
  };

  const getLogs = (asset: string, userId: string) => {
    POST(`/trans/asset-log`, {userId, asset}).then((res: any) => {
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
    console.log("saveInfo", finItem);
    POST(`/asset/save`, finItem).then((res: any) => {
      console.log({res});
    });
    closedModal(true);
  };

  const deleteItem = (finItem: FinItemProps) => {
    console.log("deleteItem", finItem);
    POST(`/asset/delete`, finItem).then((res: any) => {
      console.log({res});
    });
  };

  return (
    <>
      <Notification />
      <SectionTitle
        title="자산 Info"
        subtitle="자산 정보"
        buttonName="항목추가"
        handleEvent={() => {
          alert("항목추가");
        }}
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
              {assets &&
                assets.map((asset, i) => (
                  <tr
                    key={i}
                    className={`${
                      !asset.useYn && "line-through text-gray-400"
                    } cursor-pointer`}
                    onClick={() => getLogs(asset._id, asset.userId)}>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {asset.corpNum} {asset.corpName} ({asset.userId})
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {asset.finItemCode}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {asset.finItemName}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {asset.finName}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {new Date(asset?.defaultDate).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-right">
                      {finNumber(asset?.amount || 0)}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      <button
                        type="button"
                        className="ml-2 px-4 py-2 text-xs font-bold text-white uppercase bg-orange-500 rounded-lg hover:bg-orange-600"
                        onClick={(event: React.MouseEvent) =>
                          openModal(event, asset)
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
