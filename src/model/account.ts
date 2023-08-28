export type AccountProps = {
  user: Object;
  corpNum: string;
  bank: string;
  bankAccountType: "C" | "P";
  bankAccountNum: string;
  bankAccountPwd: string;
  useKind?: string;
  webId?: string;
  webPwd?: string;
};
