import React, { useState, useEffect, useRef, useMemo } from "react";
import "./datePicker.scss";
import DateDay from "./DateDay";
import DateMonth from "./DateMonth";
import DateYear from "./DateYear";

const clampToMaxDate = (date, maxDate) => {
  if (!maxDate) return date;
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const m = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
  return d.getTime() <= m.getTime() ? d : m;
};

const CustomDatePicker = ({
  selected,
  onChange,
  minAge,
  placeholder = "Sélectionnez une date",
  backgroundColor = "#fff",
  textColor = "#4f772d",
  borderColor = "#c7d8b6",
  fontSize = "1rem",
  yearRange = 100,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // 1️⃣ minAge >= 0 accepté (0 = aujourd'hui)
  const parsedMinAge = typeof minAge === "number" && minAge >= 0 ? minAge : null;

  // Date max calculée selon minAge
  const computedMaxDate = useMemo(() => {
    if (parsedMinAge == null) return null;
    const now = new Date();
    const yearMax = now.getFullYear() - parsedMinAge;
    return new Date(yearMax, now.getMonth(), now.getDate());
  }, [parsedMinAge]);

  // Date initiale : priorité au selected, sinon maxDate, sinon aujourd'hui
  const initialDate = useMemo(() => {
    if (selected) return new Date(selected);
    if (computedMaxDate) return new Date(computedMaxDate);
    return new Date();
  }, [selected, computedMaxDate]);

  const [currentDate, setCurrentDate] = useState(initialDate);

  // Synchronisation avec props externes
  useEffect(() => {
    if (selected) {
      setCurrentDate(new Date(selected));
    } else if (computedMaxDate) {
      setCurrentDate(new Date(computedMaxDate));
    }

  }, [selected, computedMaxDate]);

  const ref = useRef();

  // Fermeture au clic extérieur
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3️⃣ Optimisation formatDate (pas besoin de recréer un Date si déjà un objet Date)
  const formatDate = (date) => {
    if (!date) return "";
    const d = date instanceof Date ? date : new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Sélection d'un jour (clamp final)
  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const finalDate = clampToMaxDate(newDate, computedMaxDate);
    setCurrentDate(finalDate);
    onChange && onChange(finalDate);
    setIsOpen(false);
  };

  // 2️⃣ Navigation mois/année avec clamp préventif
  const handleMonthSelect = (date) => {
    setCurrentDate(clampToMaxDate(date, computedMaxDate));
  };

  const handleYearSelect = (date) => {
    setCurrentDate(clampToMaxDate(date, computedMaxDate));
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
              onMonthSelect={handleMonthSelect}
              maxDate={computedMaxDate}
            />
            <DateYear
              currentDate={currentDate}
              onYearSelect={handleYearSelect}
              range={yearRange}
              maxDate={computedMaxDate}
            />
          </div>
          <div className="calendar-grid">
            <DateDay
              currentDate={currentDate}
              onDateClick={handleDateClick}
              maxDate={computedMaxDate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
