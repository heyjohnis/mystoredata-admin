import React from "react";
import {TbReceiptTax} from "react-icons/tb";
import {BsCreditCard} from "react-icons/bs";
import {LuSheet} from "react-icons/lu";
import {FiUser} from "react-icons/fi";
import {BiTransfer} from "react-icons/bi";

type Props = {
  icon: any;
  name: string;
};
const IconButton = ({icon, name}: Props) => {
  const Icon = icon;
  return (
    <li className="flex flex-col justify-center flex-1 items-center text-xs pt-3 pb-2">
      <Icon size={30} className="mb-2 text-gray-500 stroke-current" />
      <label>{name}</label>
    </li>
  );
};

export function FootBarButtons() {
  return (
    <div className="border-t border-solid border-t-gray-200 bg-white">
      <ul className="flex justify-between">
        <IconButton icon={BsCreditCard} name="거래분석" />
        <IconButton icon={TbReceiptTax} name="당일거래현황" />
        <IconButton icon={LuSheet} name="제무재표" />
        <IconButton icon={BiTransfer} name="거래내역" />
        <IconButton icon={FiUser} name="나의정보" />
      </ul>
    </div>
  );
}
