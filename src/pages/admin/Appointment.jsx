import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);

  // Default to today's date
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();

    return today.toISOString().split("T")[0];
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch appointments whenever selectedDate changes
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/appointments?date=${selectedDate}`
        );

        console.log("Appointments response:", response.data);

        setAppointments(
          response.data.appointments ||
            response.data.data ||
            []
        );
      } catch (error) {
        console.error(
          "Failed to fetch appointments:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to load appointments."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [selectedDate]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-950 text-green-400 border-green-900";

      case "completed":
        return "bg-blue-950 text-blue-400 border-blue-900";

      case "cancelled":
        return "bg-red-950 text-red-400 border-red-900";

      default:
        return "bg-stone-800 text-stone-400 border-stone-700";
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 px-4 py-6 sm:px-6 md:p-10">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <p className="text-sm font-medium text-yellow-400">
            Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Appointments
          </h1>

          <p className="mt-2 max-w-xl text-sm text-stone-400 sm:text-base">
            View and manage customer appointments for a
            specific date.
          </p>
        </div>

        {/* Date Picker */}
        <div className="w-full lg:w-auto">
          <label
            htmlFor="appointment-date"
            className="mb-2 block text-sm font-medium text-stone-400"
          >
            Select Date
          </label>

          <input
            id="appointment-date"
            type="date"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(e.target.value)
            }
            className="w-full rounded-xl border border-stone-700 bg-stone-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500 lg:w-auto"
          />
        </div>

      </div>

      {/* Selected Date */}
      <div className="mb-6 rounded-2xl border border-stone-800 bg-stone-950 px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
          Appointments for
        </p>

        <p className="mt-1 text-base font-semibold text-white sm:text-lg">
          {new Date(
            `${selectedDate}T00:00:00`
          ).toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-stone-800 bg-stone-950 p-10 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-stone-700 border-t-yellow-400" />

          <p className="mt-4 text-sm text-stone-400">
            Loading appointments...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-900 bg-red-950/30 p-5">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* Empty */}
      {!loading &&
        !error &&
        appointments.length === 0 && (
          <div className="rounded-2xl border border-stone-800 bg-stone-950 px-6 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-900 text-xl">
              ◷
            </div>

            <p className="mt-4 text-lg font-semibold text-white">
              No appointments
            </p>

            <p className="mx-auto mt-2 max-w-sm text-sm text-stone-500">
              There are no appointments scheduled for
              this date.
            </p>
          </div>
        )}

      {/* ================= DESKTOP TABLE ================= */}
      {!loading &&
        !error &&
        appointments.length > 0 && (
          <div className="hidden overflow-hidden rounded-2xl border border-stone-800 bg-stone-950 md:block">

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="border-b border-stone-800 bg-stone-900">
                  <tr>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Service
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Date
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Time
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Price
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Status
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-800">

                  {appointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="transition hover:bg-stone-900/60"
                    >

                      {/* Customer */}
                      <td className="px-6 py-5">

                        <p className="font-medium text-white">
                          {appointment.customer?.name ||
                            "Unknown"}
                        </p>

                        <p className="mt-1 text-sm text-stone-500">
                          {appointment.customer?.phone ||
                            "No phone"}
                        </p>

                      </td>

                      {/* Service */}
                      <td className="px-6 py-5 text-stone-300">
                        {appointment.service?.name ||
                          "Unknown service"}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-stone-300">
                        {formatDate(
                          appointment.startTime
                        )}
                      </td>

                      {/* Time */}
                      <td className="px-6 py-5">

                        <p className="text-stone-300">
                          {formatTime(
                            appointment.startTime
                          )}
                        </p>

                        <p className="mt-1 text-xs text-stone-600">
                          to{" "}
                          {formatTime(
                            appointment.endTime
                          )}
                        </p>

                      </td>

                      {/* Price */}
                      <td className="px-6 py-5 font-medium text-white">
                        ₹{appointment.price}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize ${getStatusStyle(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

      {/* ================= MOBILE CARDS ================= */}
      {!loading &&
        !error &&
        appointments.length > 0 && (
          <div className="space-y-4 md:hidden">

            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="rounded-2xl border border-stone-800 bg-stone-950 p-5"
              >

                {/* Customer */}
                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="text-base font-semibold text-white">
                      {appointment.customer?.name ||
                        "Unknown"}
                    </p>

                    <p className="mt-1 text-sm text-stone-500">
                      {appointment.customer?.phone ||
                        "No phone"}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium capitalize ${getStatusStyle(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>

                </div>

                {/* Divider */}
                <div className="my-5 border-t border-stone-800" />

                {/* Service */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-stone-500">
                    Service
                  </span>

                  <span className="text-sm font-medium text-stone-200">
                    {appointment.service?.name ||
                      "Unknown service"}
                  </span>
                </div>

                {/* Date */}
                <div className="mt-4 flex items-center justify-between gap-4">
                  <span className="text-sm text-stone-500">
                    Date
                  </span>

                  <span className="text-sm text-stone-300">
                    {formatDate(
                      appointment.startTime
                    )}
                  </span>
                </div>

                {/* Time */}
                <div className="mt-4 flex items-center justify-between gap-4">
                  <span className="text-sm text-stone-500">
                    Time
                  </span>

                  <span className="text-right text-sm text-stone-300">
                    {formatTime(
                      appointment.startTime
                    )}
                    <span className="mx-1 text-stone-600">
                      -
                    </span>
                    {formatTime(
                      appointment.endTime
                    )}
                  </span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-center justify-between border-t border-stone-800 pt-4">

                  <span className="text-sm text-stone-500">
                    Price
                  </span>

                  <span className="text-lg font-bold text-yellow-400">
                    ₹{appointment.price}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

    </div>
  );
}

export default AdminAppointments;