import {AccountProps} from "./account";

export type UserProps = {
  _id: Object;
  userId: string;
  userName: string;
  email: string;
  mobile: string;
  corpNum: string;
  corpName: string;
  bizType: string;
  bizClass: string;
  addr1: string;
  addr2: string;
  ceoName: string;
  password: string;
  accounts: Array<AccountProps>;
  cards: Array<any>;
  createdAt: string;
  birth: string;
};
