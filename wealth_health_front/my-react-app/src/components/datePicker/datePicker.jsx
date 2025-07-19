import { useState, useEffect, useRef } from "react";
import "./datePicker.scss";

const CustomDatePicker = ({
  selected,
  onChange,
  placeholder = "Sélectionnez une date",
  backgroundColor = "#fff",
  textColor = "#4f772d",
  borderColor = "#c7d8b6",
  fontSize = "1rem",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(selected || new Date());

  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // yyyy-mm-dd
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onChange(newDate);
    setIsOpen(false);
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = daysInMonth(month, year);
    const startDay = new Date(year, month, 1).getDay();

    const blanks = Array.from({ length: startDay }, (_, i) => <div key={`blank-${i}`} className="blank-day"></div>);
    const dayButtons = Array.from({ length: days }, (_, i) => (
      <button
        key={`day-${i + 1}`}
        className="day-button"
        onClick={() => handleDateClick(i + 1)}
      >
        {i + 1}
      </button>
    ));

    return [...blanks, ...dayButtons];
  };

  const handleMonthChange = (delta) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + delta));
    setCurrentDate(new Date(newDate));
  };

  return (
    <div className="custom-datepicker" ref={ref}>
      <input
        type="text"
        readOnly
        value={selected ? formatDate(selected) : ""}
        placeholder={placeholder}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor,
          color: textColor,
          borderColor,
          fontSize,
        }}
      />
      {isOpen && (
        <div className="calendar-dropdown">
          <div className="calendar-header">
            <button onClick={() => handleMonthChange(-1)}>←</button>
            <span>{currentDate.toLocaleString("default", { month: "long", year: "numeric" })}</span>
            <button onClick={() => handleMonthChange(1)}>→</button>
          </div>
          <div className="calendar-grid">{renderCalendar()}</div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
