export type AccountProps = {
  _id: string;
  user: string;
  corpNum: string;
  bank: string;
  bankAccountType: "C" | "P";
  bankAccountNum: string;
  bankAccountPwd: string;
  useKind?: string;
  webId?: string;
  webPwd?: string;
  opsKind?: string;
};
