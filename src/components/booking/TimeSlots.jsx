
import { useEffect, useState } from "react";
import api from "../../services/api";

function TimeSlots({
  selectedDate,
  selectedService,
  selectedTime,
  onSelect,
}) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Salon timings
  const openingHour = 9;
  const closingHour = 19;

  /*
   * Fetch appointments whenever the selected date changes.
   */
  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    const fetchAvailability = async () => {
      try {
        setLoading(true);
        setError("");

        /*
         * Send only the date part.
         *
         * Example:
         * 2026-08-15
         */
        const date = [
          selectedDate.getFullYear(),
          String(selectedDate.getMonth() + 1).padStart(2, "0"),
          String(selectedDate.getDate()).padStart(2, "0"),
        ].join("-");

        const response = await api.get(
          `/appointments/availability?date=${date}`
        );

        console.log("Fetched appointment availability:", response.data);

        setAppointments(response.data.appointments || []);
      } catch (error) {
        console.error(
          "Error fetching appointment availability:",
          error
        );

        setError(
          "Unable to load available time slots."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [selectedDate]);

  /*
   * Generate 30-minute starting slots.
   */
  const slots = [];

  for (
    let hour = openingHour;
    hour < closingHour;
    hour++
  ) {
    for (let minute = 0; minute < 60; minute += 30) {
      slots.push({
        hour,
        minute,
      });
    }
  }

  /*
   * Convert slot into a Date object.
   */
  const createSlotDate = (hour, minute) => {
    const date = new Date(selectedDate);

    date.setHours(hour, minute, 0, 0);

    return date;
  };

  /*
   * Check whether a slot overlaps
   * with an existing appointment.
   */
  const isSlotBooked = (hour, minute) => {
    if (!selectedService || !selectedDate) {
      return false;
    }

    const slotStart = createSlotDate(hour, minute);

    const slotEnd = new Date(
      slotStart.getTime() +
        selectedService.duration * 60 * 1000
    );

    return appointments.some((appointment) => {
      const appointmentStart = new Date(
        appointment.startTime
      );

      const appointmentEnd = new Date(
        appointment.endTime
      );

      /*
       * Overlap condition:
       *
       * slotStart < appointmentEnd
       * &&
       * slotEnd > appointmentStart
       */
      return (
        slotStart < appointmentEnd &&
        slotEnd > appointmentStart
      );
    });
  };

  /*
   * Check whether the service would finish
   * after salon closing time.
   */
  const isAfterClosingTime = (hour, minute) => {
    const slotStart = createSlotDate(hour, minute);

    const slotEnd = new Date(
      slotStart.getTime() +
        selectedService.duration * 60 * 1000
    );

    const closingTime = new Date(selectedDate);

    closingTime.setHours(
      closingHour,
      0,
      0,
      0
    );

    return slotEnd > closingTime;
  };

  const formatTime = (hour, minute) => {
    const date = new Date();

    date.setHours(hour, minute, 0, 0);

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const timeToString = (hour, minute) => {
    return `${hour
      .toString()
      .padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="mt-10">
        <h2 className="text-2xl font-bold">
          Choose a Time
        </h2>

        <p className="mt-4 text-stone-400">
          Checking available time slots...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 rounded-xl border border-red-900 bg-red-950/40 p-4">
        <p className="text-sm text-red-400">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">
        Choose a Time
      </h2>

      <p className="mt-2 text-stone-400">
        Select your preferred appointment time.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {slots.map((slot) => {
          const value = timeToString(
            slot.hour,
            slot.minute
          );

          const booked = isSlotBooked(
            slot.hour,
            slot.minute
          );

          const afterClosing = isAfterClosingTime(
            slot.hour,
            slot.minute
          );

          const disabled =
            booked || afterClosing;

          const isSelected =
            selectedTime === value;

          return (
            <button
              key={value}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(value)}
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                booked
                  ? "cursor-not-allowed border-red-950 bg-red-950/30 text-stone-600"
                  : afterClosing
                  ? "cursor-not-allowed border-stone-900 bg-stone-900 text-stone-700"
                  : isSelected
                  ? "border-yellow-500 bg-yellow-500 text-black"
                  : "border-stone-800 bg-stone-950 text-stone-300 hover:border-yellow-500 hover:text-white"
              }`}
            >
              {formatTime(
                slot.hour,
                slot.minute
              )}

              {booked && (
                <span className="ml-1 text-xs">
                  Booked
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap gap-5 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-stone-700" />
          Available
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-900" />
          Booked
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          Selected
        </div>
      </div>
    </div>
  );
}

export default TimeSlots;

