import {AccountProps} from "./account";

export type UserProps = {
  _id: string;
  userId: string;
  userName: string;
  userKind: string;
  email: string;
  mobile: string;
  corpNum: string;
  corpName: string;
  corpType: string;
  bizType: string;
  bizClass: string;
  addr1: string;
  addr2: string;
  ceoName: string;
  password: string;
  hometaxID: string;
  hometaxPWD: string;
  hometaxLoginMethod: string;
  accounts: Array<AccountProps>;
  cards: Array<any>;
  createdAt: string;
  birth: string;
};
