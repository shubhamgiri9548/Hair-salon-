
import { useState } from "react";

function DateSelector({ selectedDate, onSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get today's date with time removed
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get number of days in current month
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get the first day of the month
  const firstDay = new Date(year, month, 1).getDay();

  const days = [];

  // Empty spaces before first day
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
  });

  const goToPreviousMonth = () => {
    const previousMonth = new Date(
      year,
      month - 1,
      1
    );

    // Don't allow going before current month
    const currentMonthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    if (previousMonth >= currentMonthStart) {
      setCurrentMonth(previousMonth);
    }
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(year, month + 1, 1)
    );
  };

  const handleDateClick = (day) => {
    if (!day) return;

    const selected = new Date(
      year,
      month,
      day
    );

    selected.setHours(0, 0, 0, 0);

    // Don't allow past dates
    if (selected < today) {
      return;
    }

    onSelect(selected);
  };

  const isSelected = (day) => {
    if (!selectedDate || !day) return false;

    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  const isPastDate = (day) => {
    if (!day) return false;

    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);

    return date < today;
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">
        Choose a Date
      </h2>

      <p className="mt-2 text-stone-400">
        Select the date for your appointment.
      </p>

      {/* Calendar */}
      <div className="mt-6 rounded-2xl border border-stone-800 bg-stone-950 p-5">

        {/* Month Header */}
        <div className="mb-6 flex items-center justify-between">

          <button
            type="button"
            onClick={goToPreviousMonth}
            className="rounded-full px-3 py-2 text-stone-400 transition hover:bg-stone-800 hover:text-white"
          >
            ←
          </button>

          <h3 className="font-semibold">
            {monthName} {year}
          </h3>

          <button
            type="button"
            onClick={goToNextMonth}
            className="rounded-full px-3 py-2 text-stone-400 transition hover:bg-stone-800 hover:text-white"
          >
            →
          </button>

        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-stone-500">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Days */}
        <div className="mt-3 grid grid-cols-7 gap-2">

          {days.map((day, index) => {
            const past = isPastDate(day);
            const selected = isSelected(day);

            return (
              <button
                key={index}
                type="button"
                disabled={!day || past}
                onClick={() => handleDateClick(day)}
                className={`flex h-10 items-center justify-center rounded-full text-sm transition
                  ${
                    !day
                      ? "invisible"
                      : past
                      ? "cursor-not-allowed text-stone-700"
                      : selected
                      ? "bg-yellow-500 font-bold text-black"
                      : "text-stone-300 hover:bg-stone-800"
                  }
                `}
              >
                {day}
              </button>
            );
          })}

        </div>
      </div>

      {/* Selected Date */}
      {selectedDate && (
        <p className="mt-4 text-sm text-stone-400">
          Selected date:{" "}
          <span className="font-semibold text-yellow-400">
            {selectedDate.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </p>
      )}
    </div>
  );
}

export default DateSelector;

