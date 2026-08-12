
import { Link, useLocation } from "react-router-dom";

function BookingSuccess() {
  const location = useLocation();

  const booking = location.state?.booking;

  // If someone directly opens /booking-success
  // without completing a booking
  if (!booking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-950 px-6 text-white">
        <div className="text-center">

          <h1 className="text-3xl font-bold">
            No Booking Found
          </h1>

          <p className="mt-3 text-stone-400">
            Please book an appointment first.
          </p>

          <Link
            to="/book"
            className="mt-6 inline-block rounded-full bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            Book Appointment
          </Link>

        </div>
      </main>
    );
  }

  const {
    customer,
    service,
    startTime,
    endTime,
  } = booking;

  const appointmentDate = new Date(startTime);

  const formattedDate = appointmentDate.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const formattedTime = appointmentDate.toLocaleTimeString(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-950 px-6 py-16 text-white">

      <div className="w-full max-w-2xl">

        {/* Success Icon */}
        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500 text-4xl text-black">
            ✓
          </div>

          <h1 className="mt-6 text-4xl font-bold">
            Appointment Confirmed!
          </h1>

          <p className="mt-3 text-stone-400">
            Your appointment has been successfully booked.
          </p>

        </div>

        {/* Booking Details */}
        <div className="mt-10 rounded-3xl border border-stone-800 bg-stone-900 p-6 md:p-8">

          <h2 className="text-xl font-semibold">
            Appointment Details
          </h2>

          <div className="mt-6 space-y-5">

            {/* Service */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <span className="text-stone-400">
                Service
              </span>

              <span className="font-semibold">
                {service?.name}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <span className="text-stone-400">
                Price
              </span>

              <span className="font-semibold text-yellow-400">
                ₹{booking.price}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <span className="text-stone-400">
                Date
              </span>

              <span className="font-semibold">
                {formattedDate}
              </span>
            </div>

            {/* Time */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <span className="text-stone-400">
                Time
              </span>

              <span className="font-semibold">
                {formattedTime}
              </span>
            </div>

            {/* Customer */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <span className="text-stone-400">
                Name
              </span>

              <span className="font-semibold">
                {customer?.name}
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-between">
              <span className="text-stone-400">
                Phone
              </span>

              <span className="font-semibold">
                {customer?.phone}
              </span>
            </div>

          </div>

        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <Link
            to="/"
            className="rounded-full border border-stone-700 px-6 py-3 text-center font-semibold transition hover:border-yellow-500 hover:text-yellow-400"
          >
            Back to Home
          </Link>

          <Link
            to="/book"
            className="rounded-full bg-yellow-500 px-6 py-3 text-center font-semibold text-black transition hover:bg-yellow-400"
          >
            Book Another
          </Link>

        </div>

      </div>

    </main>
  );
}

export default BookingSuccess;
