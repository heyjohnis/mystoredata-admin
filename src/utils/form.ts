import {SearchProps} from "model/SearchForm";

export const isEmptyForm = (form: SearchProps): boolean => {
  let isValied = false;
  Object.values(form || {})?.forEach((val: string) => {
    console.log("val: ", val);
    isValied = isValied || !!val;
  });
  return isValied;
};
