import {SearchProps} from "@/model/SearchForm";

export const isEmptyForm = (form: SearchProps): boolean => {
  let isValied = false;
  Object.values(form || {})?.forEach((val: string) => {
    isValied = isValied || !!val;
  });
  console.log("isValied", isValied);
  return isValied;
};
