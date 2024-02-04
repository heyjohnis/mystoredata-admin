import SectionTitle from "@/components/dashboard/section-title";
import Notification from "@/components/dashboard/notification";
import Widget from "@/components/widget";

import {useEffect, useState} from "react";
import {GET} from "@/utils/restApi";
import Modal from "@/components/corp/CorpDetailModal";
import {UserProps} from "@/model/user";

const fields: Record<string, string>[] = [
  {
    name: "로그인ID",
    key: "userId",
  },
  {
    name: "사용자명",
    key: "name",
  },
  {
    name: "회사명",
    key: "corpName",
  },
  {
    name: "사업자번호",
    key: "corpNum",
  },
  {
    name: "이메일",
    key: "email",
  },
];

const Index: React.FC = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProps | any>(null);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    GET("/user/list?userType=CORP").then((res: any) => {
      console.log({res});
      setUsers(res?.data?.data);
    });
  };

  const userDetail = (user: UserProps) => {
    console.log(user);
    setSelectedUser(user);
  };

  const closedModal = (isUpdated = false) => {
    setSelectedUser(null);
    if (isUpdated) {
      getUserList();
    }
  };

  const createUser = () => {
    setSelectedUser({});
  };

  return (
    <>
      <Notification />
      <SectionTitle
        title="corporation user"
        subtitle="사업자 목록"
        buttonName="사업자추가"
        handleEvent={createUser}
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
              {users.map((user, i) => (
                <tr key={i} onClick={() => userDetail(user)}>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {user["userId"]}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {user["userName"]}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {user["corpName"]}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {user["corpNum"]}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {user["email"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Widget>
      <Modal user={selectedUser} closedModal={closedModal} />
    </>
  );
};
export default Index;
