import { useState } from "react";

const DateYear = ({ currentDate, onYearSelect, range = 100 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: range }, (_, i) => currentYear - i);

  const handleSelect = (year) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    onYearSelect(newDate);
    setIsOpen(false);
  };

  return (
    <div className="year-selector">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-toggle"
      >
        {currentDate.getFullYear()}
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          {years.map((year) => (
            <li
              key={year}
              onClick={() => handleSelect(year)}
              className="dropdown-item"
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
