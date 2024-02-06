import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {POST} from "@/utils/restApi";
import SectionTitle from "@/components/sample/dashboard/section-title";
import Notification from "@/components/sample/dashboard/notification";
import Widget from "@/components/ui/widget";
import {Badge} from "@/components/ui/badges";
import {CategoryProps} from "@/model/Category";
import {Input} from "@/components/ui/forms/input";
import ModalCategory from "@/components/category/ModalCategory";
import {UseKind} from "@/data/commonCode";
import SearchForm from "@/components/SearchForm";

const fields: Record<string, string>[] = [
  {
    name: "code",
    key: "code",
  },
  {
    name: "계정명",
    key: "name",
  },
  {
    name: "금액",
    key: "amount",
  },
];

export default function Index() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [category, setCategory] = useState<CategoryProps>();
  const [form, setForm] = useState({});

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories: any = async () => {
    const {data}: any = await POST(`/fin-report/categories`, form);
    setCategories(data);
  };

  const closedModal = (isChanged: boolean) => {
    setCategory(undefined);
    if (isChanged) {
      getCategories();
    }
  };

  const openDetailModal = (category: CategoryProps) => {
    setCategory(category);
  };

  return (
    <>
      <Notification />
      <SectionTitle title="Financial Report" subtitle="들어온 돈 / 나간 돈" />
      <Widget>
        <SearchForm form={form} handleChange={setForm} />
        <div className="flex flex-row items-center justify-between">
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
                  <tr
                    key={i}
                    onClick={() => openDetailModal(category)}
                    className="cursor-pointer">
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {category.code}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      <Badge
                        size={"sm"}
                        color="text-blue-400 mr-1"
                        outlined
                        rounded>
                        {UseKind[category?.useKind || ""]}
                      </Badge>
                      {category.name}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                      {category.keyword?.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Widget>
      <ModalCategory category={category} closedModal={closedModal} />
    </>
  );
}
