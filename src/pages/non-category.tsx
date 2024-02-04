import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {GET} from "@/utils/restApi";
import SectionTitle from "@/components/dashboard/section-title";
import Notification from "@/components/dashboard/notification";
import Widget from "@/components/widget";
import {NonCategoryProps} from "model/NonCategory";
import ModalNonCategory from "@/components/non-category/ModalNonCategory";
import {FinClassCode, UseKind} from "data/commonCode";
import {Badge} from "@/components/badges";
import {AxiosResponse} from "axios";

const fields: Record<string, string>[] = [
  {
    name: "거래구분",
    key: "finClass",
  },
  {
    name: "적요",
    key: "remark",
  },
  {
    name: "갯수",
    key: "total",
  },
  {
    name: "사용자",
    key: "userId",
  },
  {
    name: "회사명",
    key: "corpName",
  },
  {
    name: "마지막거래일",
    key: "lastDate",
  },
];

export default function CategoryRule() {
  const router = useRouter();
  const [nonCategories, setNonCategories] = useState([]);
  const [category, setCategory] = useState<NonCategoryProps>();

  useEffect(() => {
    getNonCategories();
  }, []);

  const getNonCategories: any = async (userId: string) => {
    const res: any = await GET(`category/non-category/${userId || ""}`);
    console.log(res.data);
    setNonCategories(res.data.sort((a: any, b: any) => b.total - a.total));
  };

  const closedModal = (isChanged: boolean) => {
    setCategory(undefined);
  };

  const openDetailModal = (category: NonCategoryProps) => {
    console.log({category});
    setCategory(category);
  };

  return (
    <>
      <Notification />
      <SectionTitle title="temp-category" subtitle="임시 카테고리 설정" />
      <Widget>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                {fields.map((field, i) => (
                  <th
                    key={i}
                    className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase border-b border-gray-100 dark:border-gray-800 leading-4">
                    {field.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {nonCategories.map((category: NonCategoryProps, i) => (
                <tr key={i} onClick={() => openDetailModal(category)}>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    <Badge size={"sm"} color="text-red-400 mr-1" rounded>
                      {FinClassCode[category.finClass]} {category.finClass}
                    </Badge>
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    <Badge
                      size={"sm"}
                      color="text-blue-400 mr-1"
                      outlined
                      rounded>
                      {UseKind[category._id.useKind]}
                    </Badge>{" "}
                    {category._id?.remark}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {category.total}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {category.userId}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {category.corpName}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {new Date(category?.lastDate).toLocaleDateString()}{" "}
                    {new Date(category?.lastDate).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Widget>
      <ModalNonCategory nonCategory={category} closedModal={closedModal} />
    </>
  );
}
