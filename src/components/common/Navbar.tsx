"use client";
import {FiMenu} from "react-icons/fi";

type Props = {
  title: string;
  isOpenMenu: boolean;
  setIsOpenMenu: (isOpenMenu: boolean) => void;
};

export function Navbar({title, isOpenMenu, setIsOpenMenu}: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center w-full content-between justify-between">
        <h1>마이스토어 데이터</h1>
        <button
          className="flex items-center justify-center w-8 h-16 mx-4"
          onClick={() => setIsOpenMenu(!isOpenMenu)}>
          <FiMenu size={20} />
        </button>
      </div>
    </div>
  );
}
