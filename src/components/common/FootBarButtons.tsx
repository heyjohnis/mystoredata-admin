import React, {useEffect} from "react";
import {TbReceiptTax} from "react-icons/tb";
import {BsCreditCard} from "react-icons/bs";
import {LuSheet} from "react-icons/lu";
import {FiUser} from "react-icons/fi";
import {BiTransfer} from "react-icons/bi";
import {useRouter} from "next/router";
import Link from "next/link";

type Props = {
  icon: any;
  name: string;
  href: string;
};
const IconButton = ({icon, name, href = ""}: Props) => {
  const pathname: string = useRouter().pathname;
  const Icon = icon;
  const isCurrent = pathname === href;
  const activeClass = isCurrent ? "text-blue-500" : "";
  const iconColor = isCurrent ? "#3b82f6" : "";
  return (
    <li
      className={`flex flex-col justify-center flex-1 items-center text-xs pt-3 pb-2 ${activeClass}`}>
      <Link
        href={href}
        className="flex flex-col justify-center flex-1 items-center">
        <Icon
          size={30}
          color={iconColor}
          className={`mb-2 text-gray-500 stroke-current ${activeClass}`}
        />
        <label>{name}</label>
      </Link>
    </li>
  );
};

export function FootBarButtons() {
  return (
    <div className="border-t border-solid border-t-gray-200 bg-white">
      <ul className="flex justify-between">
        <IconButton
          icon={BsCreditCard}
          name="거래분석"
          href="/trade/analysis"
        />
        <IconButton
          icon={TbReceiptTax}
          name="당일거래현황"
          href="/trade/status"
        />
        <IconButton icon={LuSheet} name="제무재표" href="/trade/fs" />
        <IconButton icon={BiTransfer} name="거래내역" href="/trade/current" />
        <IconButton icon={FiUser} name="나의정보" href="/trade/current" />
      </ul>
    </div>
  );
}
