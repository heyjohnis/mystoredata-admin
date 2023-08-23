export type AccountProps = {
  user: string;
  corpNum: string;
  bank: string;
  bankAccountType: "C" | "P";
  bankAccountNum: string;
  bankAccountPwd: string;
  useKind?: string;
  webId?: string;
  webPwd?: string;
};
