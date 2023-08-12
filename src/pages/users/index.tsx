import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";
import Widget from "components/widget";

import { useEffect, useState } from 'react';
import { POST, GET } from 'utils/restApi'
import Modal from 'components/users/ModalDetail';
import { useCallback } from 'react';

export type UserProps = {
  userId: string;
  name: string;
  email: string;
  corpNum: string;
  corpName: string;
};

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
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [ selectedUser, setSelectedUser ] = useState<UserProps | null>(null);
  const [ toggleModal, setToggleModal ] = useState<boolean>(false);

  useEffect(() => {
    GET('user/list').then((res: any) => {
      console.log({res});
        setUsers(res.data.users);
    });

  }, []);

  const userDetail = (user: UserProps) => {
    console.log(user);
    setSelectedUser(user);
  }

  const closedModal = () => {
    setSelectedUser(null);
  }

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
              {users.map((user, i) => (
                <tr key={i} onClick={ () => userDetail(user)}>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {user["userId"]}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">
                    {user["name"]}
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
