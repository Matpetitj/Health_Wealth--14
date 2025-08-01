const DateDay = ({ currentDate, onDateClick }) => {
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = daysInMonth(month, year);
  const startDay = new Date(year, month, 1).getDay();

  const blanks = Array.from({ length: startDay }, (_, i) => (
    <div key={`blank-${i}`} className="blank-day" />
  ));

  const dayButtons = Array.from({ length: days }, (_, i) => (
    <button
      key={`day-${i + 1}`}
      className="day-button"
      onClick={() => onDateClick(i + 1)}
    >
      {i + 1}
    </button>
  ));

  return [...blanks, ...dayButtons];
};

export default DateDay;
