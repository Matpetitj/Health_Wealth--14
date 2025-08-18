import React from "react";

const DateDay = ({ currentDate, onDateClick, maxDate }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDay = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  // Décalage pour commencer la semaine le lundi
  const offset = (startDay + 6) % 7;

  const totalCells = 42;
  const days = [];

  for (let i = 0; i < totalCells; i++) {
    let displayDate, isCurrentMonth = true;

    if (i < offset) {
      // Jours du mois précédent
      displayDate = new Date(year, month, -(offset - i - 1));
      isCurrentMonth = false;
    } else if (i >= offset + totalDays) {
      // Jours du mois suivant
      displayDate = new Date(year, month + 1, i - (offset + totalDays) + 1);
      isCurrentMonth = false;
    } else {
      // Jours du mois courant
      const day = i - offset + 1;
      displayDate = new Date(year, month, day);
    }

    const isDisabled = maxDate && displayDate > maxDate;

    days.push(
      <div
        key={displayDate.toISOString()}
        className={`day 
          ${isCurrentMonth ? "current-month" : "other-month"} 
          ${isDisabled ? "disabled" : ""}`}
        onClick={() => !isDisabled && onDateClick(displayDate)}
      >
        {displayDate.getDate()}
      </div>
    );
  }

  return <div className="days-grid">{days}</div>;
};

export default DateDay;
