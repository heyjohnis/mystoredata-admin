import {UserProps} from "./user";

export type EmployeeProps = {
  _id: string;
  user: UserProps;
  userId: string;
  corpNum: string;
  corpName: string;
  empName: string;
  useYn: boolean;
};
