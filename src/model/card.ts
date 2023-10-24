export type CardProps = {
  _id: string;
  user: string;
  corpNum: string;
  cardCompany: string;
  cardType: "C" | "P";
  payType: "CREDIT" | "CHECK";
  cardNum: string;
  webId: string;
  webPwd: string;
  useKind?: string;
};
