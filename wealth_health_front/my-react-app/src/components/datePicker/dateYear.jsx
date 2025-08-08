import React, { useState } from "react";

const DateYear = ({ currentDate, onYearSelect, range = 100, maxDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const nowYear = new Date().getFullYear();
  const startYear = nowYear;
  const endYear = nowYear - (range - 1);

  let years = [];
  for (let y = startYear; y >= endYear; y--) years.push(y);

  if (maxDate) {
    years = years.filter((y) => y <= maxDate.getFullYear());
  }

  const handleSelect = (year) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);

    // Normalize to valid day in case month has fewer days
    const lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
    if (newDate.getDate() > lastDay) newDate.setDate(lastDay);

    // If maxDate and same year selected, ensure month/day <= max
    if (maxDate && newDate.getFullYear() === maxDate.getFullYear()) {
      if (newDate.getMonth() > maxDate.getMonth()) newDate.setMonth(maxDate.getMonth());
      if (newDate.getMonth() === maxDate.getMonth() && newDate.getDate() > maxDate.getDate()) newDate.setDate(maxDate.getDate());
    }

    onYearSelect && onYearSelect(newDate);
    setIsOpen(false);
  };

  return (
    <div className="year-selector" style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-toggle"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {currentDate.getFullYear()}
      </button>
      {isOpen && (
        <ul className="dropdown-list" role="listbox">
          {years.map((year) => (
            <li
              key={year}
              onClick={() => handleSelect(year)}
              className={`dropdown-item`}
              role="option"
            >
              {year}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DateYear;