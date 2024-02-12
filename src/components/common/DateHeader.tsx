import React, {useEffect, useState} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "moment/locale/ko";

type ValuePiece = Date | null;
type CalendarDate = ValuePiece | [ValuePiece, ValuePiece] | null;

export default function DateHeader({form, setForm}: any) {
  const [selectedDate, setSelectedDate] = useState<CalendarDate>(new Date());

  useEffect(() => {
    if (selectedDate) {
      const date = Array.isArray(selectedDate) ? selectedDate[0] : selectedDate;
      console.log("moment date: ", date);
      const displayDate = moment(date).format("YYYY-MM-DD");
      setForm({...form, displayDate});
    }
  }, [selectedDate]);
  return (
    <div className="relative">
      <h1 className="w-[60%] text-center m-auto mb-2 text-2xl cursor-pointer">
        {form.displayDate}
      </h1>
      <div className="absolute top-16">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          calendarType={"gregory"}
        />
      </div>
    </div>
  );
}
