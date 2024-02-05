import React, {useState} from "react";

const tabs = [
  {index: 0, title: "전체", active: true, tradeKind: ""},
  {index: 1, title: "통장", active: false, tradeKind: "CASH"},
  {index: 2, title: "체크카드", active: false, tradeKind: "CHECK"},
  {index: 3, title: "신용카드", active: false, tradeKind: "CREDIT"},
  {index: 4, title: "세금계산서", active: false, tradeKind: "BILL"},
];

type props = {
  setForm: (prev: any) => void;
};

export default function FinStatusTab({setForm}: props) {
  const [openTab, setOpenTab] = useState(0);

  return (
    <div className="flex flex-row overflow-x-auto lg:flex-wrap lg:space-x-1 mt-3 mb-1">
      {tabs.map((tab, key) => (
        <div key={key} className="flex-none">
          <button
            onClick={() => {
              setOpenTab(tab.index);
              setForm((prev: any) => ({...prev, tradeKind: tab.tradeKind}));
            }}
            className={`font-bold uppercase text-xs p-3 py-2 mr-1 rounded-lg flex flex-row items-center justify-around ${
              openTab === tab.index
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-white dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-blue-50 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            }`}
            type="button">
            {tab.title}
          </button>
        </div>
      ))}
    </div>
  );
}
