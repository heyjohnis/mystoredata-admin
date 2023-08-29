import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {GET} from "utils/restApi";
import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";
import {Badge} from "components/badges";

const fields: Record<string, string>[] = [
  {
    name: "code",
    key: "code",
  },
  {
    name: "카테고리명",
    key: "name",
  },
  {
    name: "설정",
    key: "setting",
  },
];

export default function Index() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (router.query.user) {
      const {user} = router.query;
      user && getCategories(user);
    }
  }, [router.query]);

  const getCategories: any = async (user: string) => {
    const {data}: any = await GET(`user/category/${user}`);
    console.log("getCategories: ", data);
    setCategories(data.category || []);
  };

  return (
    <>
      <Notification />
      <SectionTitle
        title="setting category"
        subtitle="키워드를 통한 카테고리 자동설정"
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
              {categories.map((category, i) => (
                <tr key={i}>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {category.code}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    <Badge
                      size={"sm"}
                      color="text-blue-400 mr-1"
                      outlined
                      rounded>
                      기본
                    </Badge>
                    {category.name}
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
