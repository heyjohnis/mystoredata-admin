import SectionTitle from "@/components/sample/dashboard/section-title";
import Notification from "@/components/sample/dashboard/notification";
import Widget from "@/components/ui/widget";
import {Input} from "@/components/ui/forms/input";
import {InputWrapper} from "@/components/ui/forms/input-wrapper";
import {Label} from "@/components/ui/forms/label";

import {useEffect, useState} from "react";
import {GET, POST, PUT, DELETE} from "@/utils/restApi";

import {FinItemProps} from "@/model/FinItemProps";
import ModalFinItem from "@/components/fin-item/ModalFinItem";

const fields: Record<string, string>[] = [
  {
    name: "사용자",
    key: "userId",
  },
  {
    name: "금융사",
    key: "CorpNum",
  },
  {
    name: "재무항목유형",
    key: "itemKind",
  },
  {
    name: "재무항목명",
    key: "itemName",
  },
  {
    name: "재무분류",
    key: "item",
  },
  {
    name: "계좌번호",
    key: "accountNum",
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
    name: "현재평가액",
    key: "currentAmount",
  },
];

const initItem = {
  _id: "",
  user: "",
  userId: "",
  account: "",
  card: "",
  itemKind: "",
  itemKindName: "",
  itemType: "",
  itemTypeName: "",
  finCorpCode: "",
  finCorpName: "",
  itemName: "",
  accountNum: "",
  defaultDate: new Date(),
  currentAmount: 0,
  isFixed: true,
  createdAt: new Date(),
  corpNum: "",
  corpName: "",
  finItemName: "",
  finItemCode: "",
  finName: "",
  transRemark: "",
  useYn: true,
  amount: 0,
  category: "",
  categoryName: "",
};

const Index: React.FC = () => {
  const [items, setItems] = useState<FinItemProps[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [corpNum, setCorpNum] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<FinItemProps>(initItem);
  useEffect(() => {
    getFinItems();
  }, [userId, corpNum]);

  const getFinItems = () => {
    console.log("get fin items");
    GET(`/fin-item/list?corpNum=${corpNum}&userId=${userId}`).then(
      (res: any) => {
        console.log({res});
        setItems(res.data);
      }
    );
  };

  const regFinItem = () => {
    openModal(initItem);
  };

  const closedModal = (isChanged: boolean) => {
    setSelectedItem(initItem);
    if (isChanged) {
      getFinItems();
    }
  };

  const openModal = (item: FinItemProps | any) => {
    setSelectedItem(item);
  };

  const saveFinItemInfo = (item: FinItemProps) => {
    if (!item?._id) {
      POST("/fin-item/reg", item)
        .then((res: any) => {
          if (res?.data) {
            alert("저장되었습니다");
            closedModal(true);
          } else {
            alert("저장에 실패하였습니다");
          }
        })
        .catch((err) => {
          console.log({err});
          alert("저장에 실패하였습니다" + err.toString());
        });
    } else {
      console.log("update: ", item);
      PUT(`/fin-item/update/${item?._id}`, item)
        .then((res: any) => {
          console.log({res});
          alert("저장되었습니다");
        })
        .catch((err) => {
          console.log({err});
        });
    }
  };

  const deleteFinItemInfo = (item: FinItemProps) => {
    if (item?._id) {
      const isDelete: boolean = window.confirm("삭제하시겠습니까?");
      if (!isDelete) return;
      DELETE(`/fin-item/delete/${item?._id}`)
        .then((res: any) => {
          console.log({res});
          alert("삭제되었습니다");
        })
        .catch((err) => {
          console.log({err});
        });
    }
  };

  return (
    <>
      <Notification />
      <SectionTitle
        title="financial asset & debt"
        subtitle="자산, 부채"
        buttonName="항목추가"
        handleEvent={regFinItem}
      />
      <Widget>
        <div className="flex">
          <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
            <Label>사업자번호</Label>
            <Input
              name="corpNum"
              type="text"
              value={corpNum}
              onChange={(e) => setCorpNum(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
            <Label>사용자ID</Label>
            <Input
              name="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </InputWrapper>
        </div>
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
              {items.map((item, i) => (
                <tr key={i} onClick={() => openModal(item)}>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {item.userId}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {item.finCorpName}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {item.itemKindName}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {item.itemTypeName}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {item.itemName}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {item.accountNum}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-right">
                    {new Date(item.defaultDate).toLocaleDateString("ko-KR")}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-right">
                    {item.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-right">
                    {item.currentAmount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Widget>
      <ModalFinItem
        finItem={selectedItem}
        closedModal={(isChanged) => closedModal(isChanged)}
        saveItem={(item) => saveFinItemInfo(item)}
        deleteItem={(item) => deleteFinItemInfo(item)}
      />
    </>
  );
};
export default Index;
