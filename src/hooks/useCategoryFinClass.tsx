import React, {use, useState, useEffect} from "react";
import {POST} from "utils/restApi";
import {SearchProps} from "model/SearchForm";
import {CategoryProps, ClassCategoryProps} from "model/ClassCategoryProps";
import {isEmptyForm} from "utils/form";

const initCategory: ClassCategoryProps = {
  IN1: [],
  IN2: [],
  IN3: [],
  OUT1: [],
  OUT2: [],
  OUT3: [],
  IN_OUT2: [],
  IN_OUT3: [],
};

export const useCategoryFinClass = (form: SearchProps) => {
  const [category, setCategory] = useState<ClassCategoryProps>(initCategory);

  const getCategroyByClass = () => {
    POST(`trans/class-category`, form).then((res: any) => {
      console.log("getCategroyByClass: ", res.data);
      setCategroyByClass(res?.data);
    });
  };

  // 거래분류에 따른 category 데이터
  const setCategroyByClass = (cate: CategoryProps[]) => {
    const classCategory = JSON.parse(JSON.stringify(initCategory));
    if (!cate) return;
    cate.forEach((category) => {
      const finClass = category?.finClassCode;
      if (finClass) classCategory[finClass].push(category);
    });
    const IN_OUT2_ARR = [...classCategory["IN2"], ...classCategory["OUT2"]];
    const IN_OUT3_ARR = [...classCategory["IN3"], ...classCategory["OUT3"]];
    console.log("IN_OUT2_ARR: ", IN_OUT2_ARR);
    console.log("IN_OUT3_ARR: ", IN_OUT3_ARR);
    setCategory({
      ...classCategory,
      IN2_OUT2: setInOutKeyArray(IN_OUT2_ARR, "IN2_OUT2"),
      IN3_OUT3: setInOutKeyArray(IN_OUT3_ARR, "IN3_OUT3"),
    });
  };

  const setInOutKeyArray = (arr: CategoryProps[], finClassCode: string) => {
    return arr.reduce((acc: CategoryProps[], cur: CategoryProps) => {
      const hasEl = acc.find((c: CategoryProps) => {
        return c.category === cur.category;
      });
      if (hasEl) {
        hasEl.transMoney += cur.transMoney;
      } else {
        acc.push({
          finClassCode,
          category: cur.category,
          categoryName: cur.categoryName,
          transMoney: cur.transMoney,
        });
      }
      return acc;
    }, []);
  };

  useEffect(() => {
    if (!isEmptyForm(form)) return;
    getCategroyByClass();
  }, [form]);

  return category;
};
