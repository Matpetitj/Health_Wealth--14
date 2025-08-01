import { useState, useEffect, useRef } from "react";
import "./datePicker.scss";
import DateDay from "./dateDay";
import DateMonth from "./dateMonth";
import DateYear from "./dateYear";

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

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setCurrentDate(newDate);
    onChange(newDate);
    setIsOpen(false);
  };

  return (
    <div className="custom-datepicker" ref={ref}>
      <input
        type="text"
        readOnly
        value={selected ? formatDate(selected) : ""}
        placeholder={placeholder}
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor, color: textColor, borderColor, fontSize }}
      />
      {isOpen && (
        <div className="calendar-dropdown">
          <div className="calendar-header">
            <DateMonth
              currentDate={currentDate}
              onMonthSelect={(date) => setCurrentDate(date)}
            />
            <DateYear
              currentDate={currentDate}
              onYearSelect={(date) => setCurrentDate(date)}
              range={100}
            />
          </div>
          <div className="calendar-grid">
            <DateDay currentDate={currentDate} onDateClick={handleDateClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
