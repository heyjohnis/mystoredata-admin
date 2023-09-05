import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";
import {Input} from "components/forms/input";
import {InputWrapper} from "components/forms/input-wrapper";
import {Label} from "components/forms/label";

import {useEffect, useState} from "react";
import {GET} from "utils/restApi";

import {FinItemProps} from "model/FinItem";
import ModalFinItem from "components/fin-item/ModalFinItem";

const fields: Record<string, string>[] = [
  {
    name: "사용자",
    key: "userId",
  },
  {
    name: "사업자",
    key: "CorpNum",
  },
  {
    name: "재무분류",
    key: "item",
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
    name: "현재평가액",
    key: "amount",
  },
];

const Index: React.FC = () => {
  const [items, setItems] = useState<FinItemProps[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [corpNum, setCorpNum] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<FinItemProps | null>(null);
  useEffect(() => {
    getAccountLogs();
  }, [userId, corpNum]);

  const getAccountLogs = () => {
    GET(`fin-item/list?corpNum=${corpNum}&userId=${userId}`).then(
      (res: any) => {
        console.log({res});
        setItems(res.data);
      }
    );
  };

  const regFinItem = () => {
    openModal(null);
  };

  const closedModal = (isClose: boolean) => {
    if (isClose) {
      setSelectedItem(null);
    }
  };

  const openModal = (item: FinItemProps | null) => {
    setSelectedItem(item);
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
                    {item.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Widget>
      <ModalFinItem finItem={selectedItem} closedModal={closedModal} />
    </>
  );
};
export default Index;
