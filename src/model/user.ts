import { AccountProps } from './account';

export type UserProps = {
    _id: string;
    userId: string;
    name: string;
    email: string;
    corpNum: string;
    corpName: string;
    password: string;
    accounts: Array<AccountProps>;
    cards: Array<any>;
    createdAt: string;
  };

