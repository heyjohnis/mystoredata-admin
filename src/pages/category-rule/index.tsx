import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {GET} from "utils/restApi";
import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";
import {Badge} from "components/badges";
import {CategoryRuleProps} from "model/CategoryRule";
import {UsePurpose} from "data/commonCode";

const fields: Record<string, string>[] = [
  {
    name: "사용자ID",
    key: "user",
  },
  {
    name: "사용목적",
    key: "useKind",
  },
  {
    name: "카테고리",
    key: "category",
  },
  {
    name: "적요",
    key: "remark",
  },
  {
    name: "키워드",
    key: "keyword",
  },
];

export default function CategoryRule() {
  const router = useRouter();
  const [rules, setRules] = useState<CategoryRuleProps[]>([]);

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
      <SectionTitle
        title="auto-setting category"
        subtitle="거래적요를 통한 카테고리 자동설정"
      />
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
                    {rule.user.toString()}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {UsePurpose[rule.useKind as keyof typeof UsePurpose]}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    [{rule.category}] {rule.categoryName}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {rule.transRemark} {rule.useStoreName}{" "}
                    {rule.useStoreBizType}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {rule.keyword?.join(", ")}
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
