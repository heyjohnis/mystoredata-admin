"use client";
import Head from "next/head";
import React, {useState} from "react";
import {SideMenu} from "@/components/common/SideMenu";
import {FiMenu} from "react-icons/fi";
import {FootBarButtons} from "@/components/common/FootBarButtons";

export type UserAppLayout = {
  children: React.ReactNode;
};

const UserAppLayout: React.FC<UserAppLayout> = ({children}) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>My Store Data</title>
      </Head>
      <SideMenu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
      <div className="flex flex-col h-screen justify-between ">
        <header>
          <div className="absolute right-0">
            <button
              className="flex items-center justify-center w-8 h-16 mx-4"
              onClick={() => setIsOpenMenu(!isOpenMenu)}>
              <FiMenu size={24} />
            </button>
          </div>
        </header>
        <div className="w-ful mb-auto p-4 overflow-auto">{children}</div>
        <footer>
          <FootBarButtons />
        </footer>
      </div>
    </>
  );
};
export default UserAppLayout;
