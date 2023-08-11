import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";
import countries from "json/countries.json";
import {formatNumber} from "functions/numbers";
import { useEffect, useState } from 'react';
import { post } from 'utils/restapi';

export type UserProps = {
  userId: string;
  name: string;
  email: string;
  corpNum: string;
  corpName: string;
};

const fields: Record<string, string>[] = [
  {
    name: "Code",
    key: "alpha3Code",
  },
  {
    name: "Name",
    key: "name",
  },
  {
    name: "Native name",
    key: "nativeName",
  },
  {
    name: "Capital",
    key: "capital",
  },
  {
    name: "Population",
    key: "population",
  },
];

const Index: React.FC = () => {

  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    post('user/list', {}).then((res) => {
      if (res.data) {
        console.log(res.data);
        setUsers(res.data);
      }
    });

  }, []);


  return (
    <>
      <Notification />
      <SectionTitle title="users" subtitle="사용자목록" />

      <Widget
        title="Default table"
        description={<span>Use the following examples for larger tables</span>}>
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
              {users.slice(0, 8).map((country, i) => (
                <tr key={i}>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {country["name"]}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Widget>

    </>
  );
};
export default Index;
