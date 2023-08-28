export type CardProps = {
  user: Object;
  corpNum: string;
  cardCompany: string;
  cardType: "C" | "P";
  cardNum: string;
  webId: string;
  webPwd: string;
  useKind?: string;
};
