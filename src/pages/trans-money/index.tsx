import {useEffect, useState} from "react";
import {BaroBankCode, CardCode, UsePurpose} from "data/commonCode";
import {GET, PUT} from "utils/restApi";
import {TransMoneyProps} from "model/TransMoney";
import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";
import {Input} from "components/forms/input";
import {InputWrapper} from "components/forms/input-wrapper";
import {Label} from "components/forms/label";
import ModalTransMoney from "components/trans-money/ModalTransMoney";

const fields: Record<string, string>[] = [
  {
    name: "거래일",
    key: "CorpNum",
  },
  {
    name: "사업자",
    key: "CorpNum",
  },
  {
    name: "계좌/카드번호",
    key: "assetNum",
  },
  {
    name: "거래금액",
    key: "transMoney",
  },
  {
    name: "사용목적",
    key: "Withdraw",
  },
  {
    name: "카테고리",
    key: "category",
  },
  {
    name: "키워드",
    key: "keyword",
  },
  {
    name: "통장내역",
    key: "accountMemo",
  },
  {
    name: "카드내역",
    key: "cardMemo",
  },
  {
    name: "결제결과",
    key: "TransRemark",
  },
  {
    name: "결제방법",
    key: "depositType",
  },
  {
    name: "거래일시",
    key: "transDate",
  },
];

const Index: React.FC = () => {
  const [logs, setLogs] = useState<TransMoneyProps[]>([]);
  const [corpNum, setCorpNum] = useState<string>("");
  const [asset, setAsset] = useState<TransMoneyProps | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [fromAt, setFromAt] = useState<string>("");
  const [toAt, setToAt] = useState<string>("");
  useEffect(() => {
    getCardLogs();
  }, [corpNum, userId, fromAt, toAt]);

  const getCardLogs = () => {
    GET(
      `trans/log?corpNum=${corpNum}&userId=${userId}&fromAt=${fromAt}&toAt=${toAt}`
    ).then((res: any) => {
      console.log({res});
      setLogs(res.data);
    });
  };

  const transMerge = () => {
    PUT(`trans/merge`, {corpNum, userId, fromAt, toAt}).then((res: any) => {
      console.log({res});
      if (res.data.success) {
        getCardLogs();
        alert("거래내역취합이 완료되었습니다.");
      }
    });
  };

  const assetDetail = async (asset: TransMoneyProps) => {
    console.log(asset);
    setAsset(asset);
  };

  const closedModal = (isUpdated = false) => {
    setAsset(null);
    if (isUpdated) {
      getCardLogs();
    }
    console.log("closedModal");
  };

  return (
    <>
      <Notification />
      <SectionTitle title="merged data" subtitle="거래내역취합" />
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
          <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
            <Label>시작일</Label>
            <Input
              name="fromAt"
              type="date"
              value={fromAt}
              onChange={(e) => setFromAt(e.target.value)}
              placeholder="YYYYMMDD"
            />
          </InputWrapper>
          <InputWrapper outerClassName="sm:col-span-12 mt-2 mr-2">
            <Label>종료일</Label>
            <Input
              name="toAt"
              type="date"
              value={toAt}
              onChange={(e) => setToAt(e.target.value)}
              placeholder="YYYYMMDD"
            />
          </InputWrapper>
          <button
            className="px-4 py-2 text-xs font-bold text-white uppercase bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={transMerge}>
            개러내역취합
          </button>
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
              {logs.map((log, i) => (
                <tr
                  key={i}
                  onClick={() => assetDetail(log)}
                  className={`${!log.useYn && "line-through text-gray-400"}`}>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {new Date(log.transDate).toLocaleDateString("ko-KR")}{" "}
                    {new Date(log.transDate).toLocaleTimeString("ko-KR")}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.corpNum} ({log.corpName})
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.bank &&
                      `[${
                        BaroBankCode[log.bank as keyof typeof BaroBankCode]
                      }]`}
                    {log.bankAccountNum}{" "}
                    {log.cardCompany &&
                      `[${CardCode[log.cardCompany as keyof typeof CardCode]}]`}
                    {log.cardNum}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-right">
                    {log.transMoney.toLocaleString("ko-KR") || "-"}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-center">
                    {UsePurpose[log.useKind as keyof typeof UsePurpose]}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-center">
                    {log.categoryName}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.keyword?.join(", ")}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {`${log.transRemark || ""} ${log.transType ? "|" : ""} ${
                      log.transType || ""
                    } ${log.transOffice ? "|" : ""} ${log.transOffice || ""} `}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {`${log.useStoreBizType || ""} ${
                      log.useStoreName ? "|" : ""
                    } ${log.useStoreName || ""}`}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.cardApprovalType}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.paymentPlan}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {new Date(log.transDate).toLocaleTimeString("ko-KR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Widget>
      <ModalTransMoney asset={asset} closedModal={closedModal} />
    </>
  );
};
export default Index;
