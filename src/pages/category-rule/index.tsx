import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {GET} from "utils/restApi";
import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";
import {Badge} from "components/badges";

const fields: Record<string, string>[] = [
  {
    name: "사용자ID",
    key: "user",
  },
  {
    name: "적요",
    key: "remark",
  },
  {
    name: "카테고리",
    key: "category",
  },
  {
    name: "키워드",
    key: "keyword",
  },
  {
    name: "사용목적",
    key: "useKind",
  },
  {
    name: "거래금액",
    key: "transMoney",
  },
];

export default function CategoryRule() {
  const router = useRouter();
  const [rules, setRules] = useState<any[]>([]);

  useEffect(() => {
    const {user} = router.query;
    getCategories(user);
  }, [router.query]);

  const getCategories: any = async (user: string) => {
    const data = await GET(`rule/category?user=${user || ""}`).then(
      (res: any) => {
        console.log(res);
        setRules(res.data.data);
      }
    );
    console.log(data);
  };

  return (
    <>
      <Notification />
      <SectionTitle title="setting category" subtitle="나의 카테고리" />
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
              {rules.map((rule, i) => (
                <tr key={i}>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {rule.user}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {rule.category} {rule.categoryName}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {rule.category} {rule.categoryName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Widget>
    </>
  );
}
