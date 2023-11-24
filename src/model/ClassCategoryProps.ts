export type ClassCategoryProps = {
  IN1: Array<CategoryProps>;
  IN2: Array<CategoryProps>;
  IN3: Array<CategoryProps>;
  OUT1: Array<CategoryProps>;
  OUT2: Array<CategoryProps>;
  OUT3: Array<CategoryProps>;
  IN_OUT2: Array<CategoryProps>;
  IN_OUT3: Array<CategoryProps>;
};

export type CategoryProps = {
  finClassCode: string;
  category: string;
  categoryName: string;
  transMoney: number;
};
