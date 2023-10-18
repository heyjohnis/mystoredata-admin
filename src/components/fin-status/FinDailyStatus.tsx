type assetProps = {
  account: string;
  itemName: string;
  amount: number;
};

export default function FinDailyStatus({
  finAmount,
  taxAmount,
  assetAmount,
}: any) {
  return (
    <>
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
                    <div className="inline-block w-25">빌린돈(부채+): 현금</div>
                    <div>{finAmount.IN2.toLocaleString()}</div>
                  </li>
                  <li className="flex justify-between">
                    <div className="inline-block w-25">갚은돈(부채-): 현금</div>
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
                    <div className="inline-block w-25">부가세(내야할)</div>
                    <div>{taxAmount.IN_TAX.toLocaleString()}</div>
                  </li>
                  <li className="flex justify-between">
                    <div className="inline-block w-25">부가세(미리낸)</div>
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
    </>
  );
}
