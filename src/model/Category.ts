export type CategoryProps = {
  order: number;
  code: string;
  name: string;
  kind: "PER" | "CMM" | "BIZ";
  isFixed: boolean;
  default: boolean;
  keyword: Array<string>;
  keywordString: string;
};
