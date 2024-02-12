import React, {useState, useEffect} from "react";
import {IoIosArrowBack} from "react-icons/io";
import {IoIosArrowForward} from "react-icons/io";

import {SearchProps} from "@/model/SearchForm";
import {dateChange, lastDayOfMonth} from "@/utils/date";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
};

const DateButton = ({children, onClick, selected}: Props) => {
  const selectedStyle = selected ? "font-bold text-gray-800" : "text-gray-500";
  return (
    <button
      className={`flex items-center justify-center w-1/4 p-2 text-center border-gray-300 ${selectedStyle}`}
      onClick={onClick}>
      {children}
    </button>
  );
};

type FormProps = {
  form: SearchProps;
  setForm: (form: SearchProps) => void;
};

export function DateSelector({form, setForm}: FormProps) {
  const targetDate =
    dateChange(new Date(), -1).toISOString().slice(0, 10) || "";

  const dateFormat = (unit: string) => {
    let fromAt, toAt, dateValue;
    switch (unit) {
      case "day":
        fromAt = targetDate;
        toAt = targetDate;
        setForm({
          ...form,
          displayDate: targetDate,
          dateUnit: "day",
          fromAt,
          toAt,
        });
        break;
      case "month":
        dateValue = targetDate?.slice(0, 7);
        fromAt = dateValue + "-01";
        toAt = lastDayOfMonth(new Date(fromAt));
        setForm({
          ...form,
          displayDate: targetDate.slice(0, 7),
          dateUnit: "month",
          fromAt,
          toAt,
        });
        break;
      case "year":
        dateValue = targetDate.slice(0, 4);
        fromAt = dateValue + "-01-01";
        toAt = dateValue + "-12-31";
        setForm({
          ...form,
          displayDate: targetDate.slice(0, 4),
          dateUnit: "year",
          fromAt,
          toAt,
        });
        break;
      default:
        setForm({...form, displayDate: targetDate});
    }
  };

  const setSearchDate = (num: number) => {
    const unit = form.dateUnit;
    const fromAt = dateChange(new Date(form.fromAt || ""), num, unit)
      .toISOString()
      .slice(0, 10);
    const toAt = dateChange(new Date(form.toAt || ""), num, unit)
      .toISOString()
      .slice(0, 10);
    const displayDate =
      unit === "day"
        ? fromAt
        : unit === "month"
        ? fromAt.slice(0, 7)
        : fromAt.slice(0, 4);
    setForm({...form, fromAt, toAt, displayDate});
  };

  const handlePrevious = () => {
    setSearchDate(-1);
  };

  const handleNext = () => {
    setSearchDate(1);
    console.log("handleNext");
  };

  const handleDay = () => {
    dateFormat("day");
  };

  const handleMonth = () => {
    console.log("handleMonth");
    dateFormat("month");
  };

  const handleYear = () => {
    dateFormat("year");
    console.log("handleYear");
  };

  return (
    <div className="flex flex-row w-full justify-between">
      <DateButton onClick={handlePrevious}>
        <IoIosArrowBack />
      </DateButton>
      <DateButton onClick={handleDay} selected={form.dateUnit === "day"}>
        일
      </DateButton>
      <DateButton onClick={handleMonth} selected={form.dateUnit === "month"}>
        월
      </DateButton>
      <DateButton onClick={handleYear} selected={form.dateUnit === "year"}>
        년
      </DateButton>
      <DateButton onClick={handleNext}>
        <IoIosArrowForward />
      </DateButton>
    </div>
  );
}
