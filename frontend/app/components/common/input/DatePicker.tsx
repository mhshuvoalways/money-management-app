"use client";

import ArrowLeftIcon from "@/app/components/common/icons/ArrowLeft";
import ArrowRightIcon from "@/app/components/common/icons/ArrowRight";
import React, { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Props {
  dateHandler: (date: Date) => void;
}

const Calendar: React.FC<Props> = ({ dateHandler }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);

    const firstDay = new Date(year, month, 1).getDay();
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day: number | null) => {
    if (day) {
      setSelectedDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      );
      dateHandler(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      );
    }
  };

  const days = generateCalendar();

  return (
    <>
      <div className="flex justify-between items-center p-2 bg-slate-200 dark:bg-slate-700 rounded-lg font-open-sans">
        <ArrowLeftIcon
          className="size-7 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-500 rounded-full p-1 transition"
          onClick={handlePrevMonth}
        />
        <p className="font-medium">
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
        <ArrowRightIcon
          className="size-7 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-500 rounded-full p-1 transition"
          onClick={handleNextMonth}
        />
      </div>
      <div className="grid grid-cols-7 gap-1 mt-2 text-center">
        {daysOfWeek.map((day) => (
          <p key={day} className="font-medium">
            {day}
          </p>
        ))}
        {days.map((day, index) => (
          <p
            key={index}
            className={`cursor-pointer rounded w-9 h-9 p-1 flex justify-center items-center transition ${
              (selectedDate &&
                day === selectedDate.getDate() &&
                currentDate.getMonth() === selectedDate.getMonth() &&
                currentDate.getFullYear() === selectedDate.getFullYear()) ||
              (!selectedDate && day === currentDate.getDate())
                ? "bg-primary text-slate-100"
                : "hover:bg-slate-200 dark:hover:bg-slate-500"
            }`}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </p>
        ))}
      </div>
    </>
  );
};

export default Calendar;
