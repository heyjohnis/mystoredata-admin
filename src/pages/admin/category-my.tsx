import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {GET} from "@/utils/restApi";
import SectionTitle from "@/components/sample/dashboard/section-title";
import Notification from "@/components/sample/dashboard/notification";
import Widget from "@/components/ui/widget";
import {Badge} from "@/components/ui/badges";

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
    const {data}: any = await GET(`/user/category/${user}`);
    console.log("getCategories: ", data);
    setCategories([
      ...data.corpCategory,
      ...data.personalCategory,
      ...data.userCategory,
    ]);
  };

  return (
    <>
      <Notification />
      <SectionTitle
        title="setting category"
        subtitle="사용자 상세화면에서 [카테고리 설정]을 누르세요"
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
