import React, {useState, useEffect} from "react";
import {POST} from "@/utils/restApi";
import {SearchProps} from "@/model/SearchForm";
import {CategoryProps, ClassCategoryProps} from "@/model/ClassCategoryProps";
import {isEmptyForm} from "@/utils/form";

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
    POST(`/trans/class-category`, form).then((res: any) => {
      console.log("getCategroyByClass: ", res?.data);
      const cateData = setCategroyByClass(res?.data, initCategory);
      setCategory(cateData);
    });
  };

  useEffect(() => {
    if (!isEmptyForm(form)) return;
    getCategroyByClass();
  }, [form]);

  return category;
};

export const useYearlyCategoryFinClass = (form: SearchProps) => {
  const [category, setCategory] = useState<ClassCategoryProps>(initCategory);

  const getCategroyByClass = () => {
    POST(`/trans/class-category/yearly`, form).then((res: any) => {
      console.log("getCategroyByClass yearly: ", res?.data);
      const cateData = setCategroyByClass(
        res?.data?.thisYear,
        res?.data?.lastYear
      );
      setCategory(cateData);
    });
  };

  useEffect(() => {
    if (!isEmptyForm(form)) return;
    getCategroyByClass();
  }, [form]);

  return category;
};

type YearlyCategoryProps = {
  IN2: CategoryProps[];
  IN3: CategoryProps[];
  IN_OUT2: CategoryProps[];
  OUT2: CategoryProps[];
  OUT3: CategoryProps[];
  IN_OUT3: CategoryProps[];
};

// 거래분류에 따른 category 데이터
function setCategroyByClass(
  cate: CategoryProps[],
  lastYear: YearlyCategoryProps
) {
  const classCategory = JSON.parse(JSON.stringify(initCategory));
  if (!cate) return;
  cate.forEach((category) => {
    const finClass = category?.finClassCode;
    if (finClass) classCategory[finClass].push(category);
  });

  // 개인사용목적만 분류
  const OUT1Logs = classCategory["OUT1"];
  const personalLogs = OUT1Logs.filter(
    (log: CategoryProps) => log?.useKind === "PERSONAL"
  );
  const sumPersonalLog = personalLogs.reduce(
    (sum: number, cur: CategoryProps) => {
      return sum + cur.transMoney;
    },
    0
  );
  const bizLogs = OUT1Logs.filter(
    (log: CategoryProps) => log?.useKind === "BIZ"
  );

  classCategory["OUT1"] = [
    ...bizLogs,
    {
      category: "-99999999",
      categoryName: "가계비",
      finClassCode: "OUT1",
      transMoney: sumPersonalLog,
      useKind: "PERSONAL",
    },
  ];

  const IN_OUT2_ARR = [
    ...classCategory["IN2"],
    ...setNagativeNumber(classCategory["OUT2"]),
    ...(lastYear?.IN2 || []),
    ...setNagativeNumber(lastYear?.OUT2 || []),
  ];
  const IN_OUT3_ARR = [
    ...classCategory["IN3"],
    ...setNagativeNumber(classCategory["OUT3"]),
    ...(lastYear?.IN3 || []),
    ...setNagativeNumber(lastYear?.OUT3 || []),
  ];
  console.log("IN_OUT2_ARR: ", IN_OUT2_ARR);
  console.log("IN_OUT3_ARR: ", IN_OUT3_ARR);

  return {
    ...classCategory,
    IN2_OUT2: setInOutKeyArray(IN_OUT2_ARR, "IN2_OUT2"),
    IN3_OUT3: setInOutKeyArray(IN_OUT3_ARR, "IN3_OUT3"),
  };
}

function setNagativeNumber(arr: CategoryProps[]) {
  return arr.map((c: CategoryProps) => {
    c.transMoney = c.transMoney * -1;
    return c;
  });
}

function setInOutKeyArray(arr: CategoryProps[], finClassCode: string) {
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
}
