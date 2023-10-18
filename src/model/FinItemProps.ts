import {UserProps} from "./user";

export type FinItemProps = {
  _id: string;
  user: UserProps;
  userId: string;
  corpNum: string;
  corpName: string;
  finItemName: string;
  finItemCode: string;
  finName: string;
  transRemark: string;
  useYn: boolean;
};
