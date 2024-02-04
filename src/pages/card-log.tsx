import SectionTitle from "@/components/dashboard/section-title";
import Notification from "@/components/dashboard/notification";
import Widget from "@/components/widget";
import {CardCode} from "@/data/commonCode";

import {useEffect, useState} from "react";
import {GET} from "@/utils/restApi";
import {CardLogProps} from "model/cardLog";
import {InputWrapper} from "@/components/forms/input-wrapper";
import {Label} from "@/components/forms/label";
import {Input} from "@/components/forms/input";
import CardLog from "@/components/card-log/CardLog";

const Index: React.FC = () => {
  const [logs, setLogs] = useState<CardLogProps[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [corpNum, setCorpNum] = useState<string>("");
  useEffect(() => {
    getCardLogs();
  }, [userId, corpNum]);

  const getCardLogs = () => {
    GET(`card/log?userId=${userId}&corpNum=${corpNum}`).then((res: any) => {
      console.log({res});
      setLogs(res.data);
    });
  };

  return (
    <>
      <Notification />
      <SectionTitle title="card raw data" subtitle="카드데이터" />
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
        <CardLog
          logs={logs}
          handleClick={() => {
            console.log("click");
          }}
        />
      </Widget>
    </>
  );
};
export default Index;
