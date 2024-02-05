import React from "react";
import {IoIosArrowBack} from "react-icons/io";
import {IoIosArrowForward} from "react-icons/io";

const DateButton = ({children}: {children: React.ReactNode}) => {
  return (
    <button className="flex items-center justify-center w-1/4 p-2 text-center border-gray-300">
      {children}
    </button>
  );
};

export function DateSelector() {
  return (
    <div className="flex flex-row w-full justify-between ">
      <DateButton>
        <IoIosArrowBack />
      </DateButton>
      <DateButton>일</DateButton>
      <DateButton>월</DateButton>
      <DateButton>년</DateButton>
      <DateButton>
        <IoIosArrowForward />
      </DateButton>
    </div>
  );
}
