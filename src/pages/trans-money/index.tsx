import {useEffect, useState} from "react";
import {BankCode, CardCode, UsePurpose} from "data/commonCode";
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
  const [asset, setAsset] = useState<TransMoneyProps>();
  const [category, setCategory] = useState<Record<string, string> | null>();

  useEffect(() => {
    getCardLogs();
  }, [corpNum]);

  const getCardLogs = () => {
    GET(`trans/log?corpNum=${corpNum}`).then((res: any) => {
      console.log({res});
      setLogs(res.data.data);
    });
  };

  const transMerge = () => {
    PUT(`trans/merge`, {corpNum}).then((res: any) => {
      console.log({res});
      if (res.data.success) {
        getCardLogs();
      }
    });
  };

  const assetDetail = async (asset: TransMoneyProps) => {
    console.log(asset);
    setAsset(asset);
  };

  const closedModal = (isUpdated = false) => {
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
          <InputWrapper inline={true} outerClassName="sm:col-span-12 mr-1">
            <Label>조회사업자</Label>
            <Input
              name="corpNum"
              type="text"
              value={corpNum}
              onChange={(e) => setCorpNum(e.target.value)}
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
                <tr key={i} onClick={() => assetDetail(log)}>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.transDate.toString().substring(0, 10)}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.corpNum} ({log.corpName})
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {log.bank &&
                      `[${BankCode[log.bank as keyof typeof BankCode]}]`}
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
                    {log.transDate.toString().substring(0, 19)}
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
