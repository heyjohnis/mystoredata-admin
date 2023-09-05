import {UserProps} from "./user";

export type AccountLogProps = {
  user: UserProps;
  userId: string;
  corpNum: string;
  corpName: string;
  bank: string;
  bankAccountNum: string;
  withdraw: string;
  deposit: string;
  balance: string;
  transDT: string;
  transType: string;
  transOffice: string;
  transRemark: string;
  transRefKey: string;
  mgtRemark1: string;
  mgtRemark2: string;
  transDate: Date;
  keyword: Array<string>;
};
