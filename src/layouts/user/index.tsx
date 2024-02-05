"use client";
import Head from "next/head";
import React, {useState} from "react";
import {Navbar} from "@/components/common/Navbar";
import {SideMenu} from "@/components/common/SideMenu";
import {FiMenu} from "react-icons/fi";
export type UserAppLayout = {
  children: React.ReactNode;
};

const UserAppLayout: React.FC<UserAppLayout> = ({children}) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>MyStoreData-Admin</title>
      </Head>
      <SideMenu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
      <div className="wrapper">
        <div className="main w-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
          <div className="absolute right-0">
            <button
              className="flex items-center justify-center w-8 h-16 mx-4"
              onClick={() => setIsOpenMenu(!isOpenMenu)}>
              <FiMenu size={20} />
            </button>
          </div>
          <div className="w-full min-h-screen p-4">{children}</div>
        </div>
      </div>
    </>
  );
};
export default UserAppLayout;
