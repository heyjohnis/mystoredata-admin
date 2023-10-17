import {UserProps} from "./user";

export type DebtProps = {
  _id: string;
  user: UserProps;
  userId: string;
  corpNum: string;
  corpName: string;
  debtTypeName: string;
  debtTypeCode: string;
  debtName: string;
  transRemark: string;
  useYn: boolean;
};
