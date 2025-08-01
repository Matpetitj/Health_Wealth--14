import { useState } from "react";

const DateMonth = ({ currentDate, onMonthSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );

  const handleSelect = (index) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(index);
    onMonthSelect(newDate);
    setIsOpen(false);
  };

  return (
    <div className="month-selector">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-toggle"
      >
        {months[currentDate.getMonth()]}
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          {months.map((month, index) => (
            <li
              key={month}
              onClick={() => handleSelect(index)}
              className="dropdown-item"
            >
              {month}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DateMonth;
