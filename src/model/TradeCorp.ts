import {UserProps} from "./user";

export type TradeCorpProps = {
  _id: string;
  user: UserProps;
  userId: string;
  corpNum: string;
  corpName: string;
  tradeType: string;
  tradeTypeCode: number;
  tradeCorpNum: string;
  tradeCorpName: string;
  tradeCorpCEOName: string;
  tradeCorpAddr: string;
  tradeCorpBizType: string;
  tradeCorpBizClass: string;
  tradeCorpEmail: string;
  tradeRemark: string;
  useYn: boolean;
};
