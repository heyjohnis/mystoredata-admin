import {FiSlack, FiGithub} from "react-icons/fi";
import SectionTitle from "components/section-title";
import Faq from "components/faq";
import Features from "components/support/features";
import Search from "components/support/search";
import Title from "components/support/title";
import Widget1 from "components/support/widget-1";
import SearchForm from "components/SearchForm";
import {useEffect, useState} from "react";
import Widget from "components/widget";
import {TransMoneyProps} from "model/TransMoney";
import {POST} from "utils/restApi";
import {SearchProps} from "model/SearchForm";
import TransMoneyLog from "components/trans-money/TransMoneyLog";
import ModalTransMoney from "components/trans-money/ModalTransMoney";
import {set} from "nprogress";

interface FinAmount {
  [key: string]: number;
}

type dataProps = {
  _id: string;
  amount: number;
};

const initFinAmount: FinAmount = {
  IN1: 0,
  IN2: 0,
  IN3: 0,
  IN4: 0,
  OUT1: 0,
  OUT2: 0,
  OUT3: 0,
  OUT4: 0,
};

const initFinTaxAmount: FinAmount = {
  IN_TAX: 0,
  IN_AMT: 0,
  IN_TOTAL: 0,
  OUT_TAX: 0,
  OUT_AMT: 0,
  OUT_TOTAL: 0,
};

type assetProps = {
  account: string;
  itemName: string;
  amount: number;
};

const Index: React.FC = () => {
  const [form, setForm] = useState<SearchProps>();
  const [finAmount, setFinAmount] = useState<FinAmount>(initFinAmount);
  const [taxAmount, setTaxAmount] = useState<FinAmount>(initFinTaxAmount);
  const [assetAmount, setAssetAmount] = useState<assetProps[]>([]);
  const [logs, setLogs] = useState<TransMoneyProps[]>([]);
  const [asset, setAsset] = useState<TransMoneyProps | null>(null);
  const [finClassCode, setFinClassCode] = useState<string>("");

  useEffect(() => {
    if (form?.userId && form?.fromAt && form.fromAt) {
      getFinStatusData();
      getFinTaxData();
      getFinAssetData();
    }
  }, [form]);

  const getFinStatusData = () => {
    POST(`fin-status/amount`, form).then((res: any) => {
      console.log("fin-status: ", res.data);
      const finAmounts =
        res?.data.length > 0
          ? res?.data?.reduce(
              (amts: FinAmount, amt: dataProps) => {
                amts[amt._id] = amt?.amount || 0;
                return amts;
              },
              {...initFinAmount} as FinAmount
            )
          : initFinAmount;
      console.log("setFinAmount: ", finAmounts);
      setFinAmount(finAmounts);
    });
  };

  const getFinTaxData = () => {
    POST(`fin-status/tax`, form).then((res: any) => {
      console.log("fin-tax: ", res.data);
      const taxAmounts =
        res?.data.length > 0
          ? res?.data?.forEach((item: any) => {
              if (item._id === 1) {
                setTaxAmount({
                  ...taxAmount,
                  IN_TAX: item?.tax || 0,
                  IN_AMT: item?.amount || 0,
                  IN_TOTAL: item?.total || 0,
                });
              } else {
                setTaxAmount({
                  ...taxAmount,
                  OUT_TAX: item?.tax || 0,
                  OUT_AMT: item?.amount || 0,
                  OUT_TOTAL: item?.total || 0,
                });
              }
            })
          : initFinTaxAmount;
    });
  };

  const getFinAssetData = () => {
    POST(`fin-status/asset`, form).then((res: any) => {
      console.log("fin-asset: ", res.data);
      setAssetAmount([...res.data]);
    });
  };

  const getFinClassData = (code: string) => {
    setFinClassCode(code);
    POST(`trans/log`, {...form, finClassCode: code}).then((res: any) => {
      console.log("transdata: ", res.data);
      setLogs(res.data);
    });
  };

  const closedModal = (isUpdated = false) => {
    setAsset(null);
    if (isUpdated) {
      getFinClassData(finClassCode);
    }
    console.log("closedModal");
  };

  return (
    <>
      <SectionTitle title="Financial Status" subtitle="재정상태" />
      <Widget>
        <SearchForm form={form} handleChange={setForm} />
        <div className="flex justify-between">
          <div className="w-1/2 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-bold mb-3">자산/부채/수입/지출</h2>
            <div className="flex justify-between m-5">
              <div
                className="flex justify-center cursor-pointer items-center"
                onClick={() => getFinClassData("IN1")}>
                <div className="w-24 text-gray-500	text-xs mr-3">
                  번것(수익+)
                </div>
                <div className="w-24 text-right text-lg">
                  {finAmount.IN1.toLocaleString()}
                </div>
              </div>
              <div className="bg-gray w-2"></div>
              <div
                className="flex justify-center cursor-pointer items-center"
                onClick={() => getFinClassData("OUT1")}>
                <div className="w-24 text-gray-500	text-xs mr-3">
                  쓴것(비용+)
                </div>
                <div className="w-24 text-right text-lg">
                  {(finAmount.OUT1 * -1).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="flex justify-between m-5">
              <div
                className="flex justify-center cursor-pointer items-center"
                onClick={() => getFinClassData("IN2")}>
                <div className="w-24 text-gray-500	text-xs mr-3">
                  빌린돈(부채+)
                </div>
                <div className="w-24 text-right text-lg">
                  {finAmount.IN2.toLocaleString()}
                </div>
              </div>
              <div className="bg-gray w-2"></div>
              <div
                className="flex justify-center cursor-pointer items-center"
                onClick={() => getFinClassData("OUT2")}>
                <div className="w-24 text-gray-500	text-xs mr-3">
                  갚은돈(부채-)
                </div>
                <div className="w-24 text-right text-lg">
                  {(finAmount.OUT2 * -1).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="flex justify-between m-5">
              <div
                className="flex justify-center cursor-pointer items-center"
                onClick={() => getFinClassData("IN3")}>
                <div className="w-24 text-gray-500	text-xs mr-3">
                  나머지(자산-)
                </div>
                <div className="w-24 text-right text-lg">
                  {finAmount.IN3.toLocaleString()}
                </div>
              </div>
              <div className="bg-gray w-2"></div>
              <div
                className="flex justify-center cursor-pointer items-center"
                onClick={() => getFinClassData("OUT3")}>
                <div className="w-24 text-gray-500	text-xs mr-3">
                  나머지(자산+)
                </div>
                <div className="w-24 text-right text-lg">
                  {(finAmount.OUT3 * -1).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="flex justify-between m-5">
              <div
                className="flex justify-center cursor-pointer items-center"
                onClick={() => getFinClassData("IN4")}>
                <div className="w-24 text-gray-500	text-xs mr-3">
                  미지정(입금)
                </div>
                <div className="w-24 text-right text-lg">
                  {finAmount.IN4.toLocaleString()}
                </div>
              </div>
              <div className="bg-gray w-2"></div>
              <div
                className="flex justify-center cursor-pointer items-center"
                onClick={() => getFinClassData("OUT4")}>
                <div className="w-24 text-gray-500	text-xs mr-3">
                  미지정(출금)
                </div>
                <div className="w-24 text-right text-lg">
                  {(finAmount.OUT4 * -1).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 p-4 mt-4 m-3 bg-white border border-gray-100 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-bold mb-3">간편 재무제표</h2>
            <div className="p-5 pt-1">
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td>수익</td>
                    <td className="text-right">
                      <ul>
                        <li className="flex justify-between">
                          <div className="inline-block w-25">매출 입금액</div>
                          <div>{finAmount.IN1.toLocaleString()}</div>
                        </li>
                        <li className="flex justify-between">
                          <div className="inline-block w-25">빌린돈(부채+)</div>
                          <div>{finAmount.IN2.toLocaleString()}</div>
                        </li>
                        <li className="flex justify-between">
                          <div className="inline-block w-25">나머지(자산-)</div>
                          <div>{finAmount.IN3.toLocaleString()}</div>
                        </li>
                        <li className="flex justify-between">
                          <div className="inline-block w-25">
                            세금계산서(외상매출금)
                          </div>
                          <div>{taxAmount.IN_AMT.toLocaleString()}</div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td>지출</td>
                    <td className="text-right">
                      <ul>
                        <li className="flex justify-between">
                          <div className="inline-block w-25">매입 출금액</div>
                          <div>{(finAmount.OUT1 * -1).toLocaleString()}</div>
                        </li>
                        <li className="flex justify-between">
                          <div className="inline-block w-25">갚은돈(부채-)</div>
                          <div>{(finAmount.OUT2 * -1).toLocaleString()}</div>
                        </li>
                        <li className="flex justify-between">
                          <div className="inline-block w-25">나머지(자산+)</div>
                          <div>{(finAmount.OUT3 * -1).toLocaleString()}</div>
                        </li>
                        <li className="flex justify-between">
                          <div className="inline-block w-25">
                            세금계산서(외상매입금)
                          </div>
                          <div>{(taxAmount.OUT_AMT * -1).toLocaleString()}</div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td>내 돈(자산)</td>
                    <td className="text-right">
                      <ul>
                        <li className="flex justify-between">
                          <div className="inline-block w-25">나머지(자산-)</div>
                          <div>{finAmount.IN3.toLocaleString()}</div>
                        </li>
                        <li className="flex justify-between">
                          <div className="inline-block w-25">나머지(자산+)</div>
                          <div>{finAmount.OUT3.toLocaleString()}</div>
                        </li>
                        <li className="flex justify-between">
                          <div className="inline-block w-25">
                            빌린돈(부채+): 현금
                          </div>
                          <div>{finAmount.IN2.toLocaleString()}</div>
                        </li>
                        <li className="flex justify-between">
                          <div className="inline-block w-25">
                            갚은돈(부채-): 현금
                          </div>
                          <div>{finAmount.OUT2.toLocaleString()}</div>
                        </li>
                        {assetAmount &&
                          assetAmount.map((asset: assetProps) => (
                            <li className="flex justify-between">
                              <div className="inline-block w-25">
                                {asset.itemName}
                              </div>
                              <div>{asset?.amount?.toLocaleString()}</div>
                            </li>
                          ))}
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td>남의 돈(부채)</td>
                    <td className="text-right">
                      <ul>
                        <li className="flex justify-between">
                          <div className="inline-block w-25">빌린돈(부채+)</div>
                          <div>{finAmount.IN2.toLocaleString()}</div>
                        </li>
                        <li className="flex justify-between">
                          <div className="inline-block w-25">갚은돈(부채-)</div>
                          <div>{(finAmount.OUT2 * -1).toLocaleString()}</div>
                        </li>
                        <li className="flex justify-between">
                          <div className="inline-block w-25">
                            부가세(내야할)
                          </div>
                          <div>{taxAmount.IN_TAX.toLocaleString()}</div>
                        </li>
                        <li className="flex justify-between">
                          <div className="inline-block w-25">
                            부가세(미리낸)
                          </div>
                          <div>{taxAmount.OUT_TAX.toLocaleString()}</div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td>남은 돈(자본)</td>
                    <td className="text-right">
                      <ul>
                        {assetAmount &&
                          assetAmount.map((asset: assetProps) => (
                            <li className="flex justify-between">
                              <div className="inline-block w-25">
                                {asset.itemName}
                              </div>
                              <div>{asset?.amount?.toLocaleString()}</div>
                            </li>
                          ))}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Widget>
      <Widget>
        <TransMoneyLog logs={logs} setData={setAsset} />
        <ModalTransMoney asset={asset} closedModal={closedModal} />
      </Widget>
    </>
  );
};
export default Index;
