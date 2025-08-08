import React from "react";

const DateDay = ({ currentDate, onDateClick, maxDate }) => {
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = daysInMonth(month, year);

  // Weekday of the 1st (0 = Sunday)
  const startDay = new Date(year, month, 1).getDay();

  const blanks = Array.from({ length: startDay }, (_, i) => (
    <div key={`blank-${i}`} className="blank-day" aria-hidden />
  ));

  const dayButtons = Array.from({ length: days }, (_, i) => {
    const dayNum = i + 1;
    const date = new Date(year, month, dayNum);
    const isDisabled = maxDate ? date.getTime() > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()).getTime() : false;

    return (
      <button
        key={`day-${dayNum}`}
        type="button"
        className={`day-button ${isDisabled ? "disabled" : ""}`}
        onClick={() => !isDisabled && onDateClick(dayNum)}
        disabled={isDisabled}
        aria-disabled={isDisabled}
      >
        {dayNum}
      </button>
    );
  });

  return <>{[...blanks, ...dayButtons]}</>;
};

export default DateDay;