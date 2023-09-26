export type CategoryProps = {
  order: number;
  code: string;
  name: string;
  isFixed?: boolean;
  default?: boolean;
  keyword?: Array<string>;
  useKind?: string;
  keywordString?: string;
  finClass?: string;
};
