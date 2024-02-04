import {useState} from "react";
import {TransMoneyProps} from "../../model/TransMoney";
import {UseKind, BaroBankCode, CardCode} from "@/data/commonCode";
import {Badge} from "@/components/badges";
import ModalTransMoney from "./ModalTransMoney";

const fields: Record<string, string>[] = [
  {
    name: "거래일",
    key: "CorpNum",
  },
  {
    name: "사용자",
    key: "CorpNum",
  },
  {
    name: "거래구분",
    key: "fin-class",
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
    name: "거래유형",
    key: "tradeKind",
  },
  {
    name: "카테고리",
    key: "category",
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
    name: "키워드",
    key: "keyword",
  },
  {
    name: "계좌/카드번호",
    key: "assetNum",
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
  {
    name: "ID",
    key: "_id",
  },
  {
    name: "AccountLog",
    key: "accountLog",
  },
  {
    name: "CardLog",
    key: "cardLog",
  },
  {
    name: "itemLog",
    key: "itemLog",
  },
];

type Props = {
  logs: TransMoneyProps[];
  setData?: any;
  reload?: any;
};

export default function TransMoneyLog({logs, reload}: Props) {
  const [asset, setAsset] = useState<TransMoneyProps | null>(null);

  const assetDetail = async (asset: TransMoneyProps) => {
    console.log(asset);
    setAsset(asset);
  };

  const closedModal = (isUpdated = false) => {
    setAsset(null);
    if (isUpdated && reload) {
      reload();
    }
    console.log("closedModal");
  };

  return (
    <>
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
            {logs &&
              logs.map((log, i) => (
                <tr
                  key={i}
                  onClick={() => assetDetail(log)}
                  className={`${
                    !log.useYn && "line-through text-gray-400 cursor-pointer"
                  } cursor-pointer`}>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {new Date(log.transDate).toLocaleDateString("ko-KR")}{" "}
                    {new Date(log.transDate).toLocaleTimeString("ko-KR")}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.corpNum} ({log.corpName})
                  </td>
                  <td
                    className={`px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-center ${
                      ["OUT1", "OUT2", "IN3"].includes(log.finClassCode)
                        ? "text-blue-600"
                        : "text-red-600"
                    } `}>
                    {log.finClassName}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-right">
                    {log.transMoney.toLocaleString("ko-KR") || "-"}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-center">
                    {UseKind[log.useKind as keyof typeof UseKind]}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-center">
                    <Badge
                      size={"sm"}
                      color={`text-${
                        log.tradeKind === "CHECK"
                          ? "blue"
                          : log.tradeKind === "BILL"
                          ? "yellow"
                          : log.tradeKind === "CREDIT"
                          ? "red"
                          : "gray"
                      }-400 mr-1`}
                      rounded>
                      {log.tradeKind || "CASH"}
                    </Badge>
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-center">
                    {log.categoryName}
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
                    {log.keyword?.join(", ")}
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
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.cardApprovalType}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.paymentPlan}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {new Date(log.transDate).toLocaleTimeString("ko-KR")}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log._id}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.accountLog}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.cardLog}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.item}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ModalTransMoney asset={asset} closedModal={closedModal} />
    </>
  );
}
