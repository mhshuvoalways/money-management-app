"use client";

import ArrowBottomIcon from "@/app/components/common/icons/ArrowBottom";
import ArrowLeftIcon from "@/app/components/common/icons/ArrowLeft";
import ArrowRightIcon from "@/app/components/common/icons/ArrowRight";
import React, { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface Props {
  dateHandler: (date: Date) => void;
}

const Calendar: React.FC<Props> = ({ dateHandler }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isYearSelection, setIsYearSelection] = useState(false);
  const [isMonthSelection, setIsMonthSelection] = useState(false);

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
    setIsMonthSelection(false);
    setIsYearSelection(false);
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setIsMonthSelection(false);
    setIsYearSelection(false);
  };

  const handleDateClick = (day: number | null) => {
    if (day) {
      const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      setSelectedDate(newDate);
      dateHandler(newDate);
    }
  };

  const handleYearClick = () => {
    setIsYearSelection(!isYearSelection);
    setIsMonthSelection(false);
  };

  const handleMonthClick = () => {
    setIsMonthSelection(!isMonthSelection);
    setIsYearSelection(false);
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(year, currentDate.getMonth(), 1);
    setCurrentDate(newDate);
    setIsYearSelection(false);
  };

  const handleMonthSelect = (month: number) => {
    const newDate = new Date(currentDate.getFullYear(), month, 1);
    setCurrentDate(newDate);
    setIsMonthSelection(false);
  };

  const generateYearRange = () => {
    const currentYear = currentDate.getFullYear();
    const years = [];
    for (let i = currentYear - 20; i <= currentYear + 20; i++) {
      years.push(i);
    }
    return years;
  };

  const days = generateCalendar();
  const years = generateYearRange();

  return (
    <div className="min-w-72">
      <div className="flex justify-between items-center p-2 bg-slate-100 dark:bg-slate-600 rounded-lg font-open-sans">
        <ArrowLeftIcon
          className="size-7 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-500 rounded-full p-1 transition"
          onClick={handlePrevMonth}
        />
        <div className="flex items-center gap-2">
          <ArrowBottomIcon
            className="size-6 hover:bg-slate-200 dark:hover:bg-slate-700 p-1 rounded-full cursor-pointer"
            onClick={handleMonthClick}
          />
          <p className="font-medium">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
          <ArrowBottomIcon
            className="size-6 hover:bg-slate-200 dark:hover:bg-slate-700 p-1 rounded-full cursor-pointer"
            onClick={handleYearClick}
          />
        </div>
        <ArrowRightIcon
          className="size-7 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-500 rounded-full p-1 transition"
          onClick={handleNextMonth}
        />
      </div>
      {isYearSelection ? (
        <div className="grid grid-cols-5 gap-2 mt-2 text-center">
          {years.map((year) => (
            <p
              key={year}
              className="cursor-pointer rounded p-2 flex justify-center items-center hover:bg-slate-200 dark:hover:bg-slate-500"
              onClick={() => handleYearSelect(year)}
            >
              {year}
            </p>
          ))}
        </div>
      ) : isMonthSelection ? (
        <div className="grid grid-cols-3 gap-2 mt-2 text-center">
          {monthsOfYear.map((month, index) => (
            <p
              key={month}
              className="cursor-pointer rounded p-2 flex justify-center items-center hover:bg-slate-200 dark:hover:bg-slate-500"
              onClick={() => handleMonthSelect(index)}
            >
              {month}
            </p>
          ))}
        </div>
      ) : (
        <>
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
      )}
    </div>
  );
};

export default Calendar;
