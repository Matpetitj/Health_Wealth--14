import React, { useState } from "react";

const monthsNames = Array.from({ length: 12 }, (_, i) =>
  new Date(0, i).toLocaleString("default", { month: "long" })
);

const DateMonth = ({ currentDate, onMonthSelect, maxDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = currentDate.getFullYear();

  const handleSelect = (index) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(index);
    // If newDate's day does not exist in the month (e.g., 31 -> Feb), JS will roll it
    // so we normalize to the last day of the month to keep things predictable
    const lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
    if (newDate.getDate() > lastDay) newDate.setDate(lastDay);

    // If maxDate and same year, make sure month selection doesn't go past max
    if (maxDate && currentYear === maxDate.getFullYear() && index > maxDate.getMonth()) {
      return; // blocked
    }

    onMonthSelect && onMonthSelect(newDate);
    setIsOpen(false);
  };

  return (
    <div className="month-selector" style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-toggle"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {monthsNames[currentDate.getMonth()]}
      </button>
      {isOpen && (
        <ul className="dropdown-list" role="listbox">
          {monthsNames.map((month, index) => {
            const isDisabled = maxDate && currentYear === maxDate.getFullYear() && index > maxDate.getMonth();
            return (
              <li
                key={month}
                onClick={() => !isDisabled && handleSelect(index)}
                className={`dropdown-item ${isDisabled ? "disabled" : ""}`}
                role="option"
                aria-disabled={isDisabled}
              >
                {month}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DateMonth;
