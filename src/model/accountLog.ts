import {UserProps} from "./user";

export type AccountLogProps = {
  user: UserProps;
  CorpNum: string;
  CorpName: string;
  bank: string;
  BankAccountNum: string;
  Withdraw: string;
  Deposit: string;
  Balance: string;
  TransDT: string;
  TransType: string;
  TransOffice: string;
  TransRemark: string;
  TransRefKey: string;
  MgtRemark1: string;
  MgtRemark2: string;
  transDate: Date;
  keyword: Array<string>;
};
