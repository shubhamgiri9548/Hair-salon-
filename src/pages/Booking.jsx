
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ServiceSelector from "../components/booking/ServiceSelector";
import DateSelector from "../components/booking/DateSelector";
import TimeSlots from "../components/booking/TimeSlots";
import CustomerForm from "../components/booking/CustomerForm";

import api from "../services/api";

function Booking() {
  const navigate = useNavigate();

  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    // Validate service
    if (!selectedService) {
      setError("Please select a service.");
      return;
    }

    // Validate date
    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }

    // Validate time
    if (!selectedTime) {
      setError("Please select a time.");
      return;
    }

    // Validate customer name
    if (!customer.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    // Validate phone
    if (!customer.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!/^[0-9]{10}$/.test(customer.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      /*
       * Combine selected date and selected time.
       *
       * selectedTime example:
       * "10:30"
       *
       * selectedDate:
       * Date object
       */

      const [hours, minutes] = selectedTime.split(":");

      const appointmentStart = new Date(selectedDate);

      appointmentStart.setHours(
        Number(hours),
        Number(minutes),
        0,
        0
      );

      // Data expected by your backend
      const appointmentData = {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        serviceId: selectedService._id,
        startTime: appointmentStart.toISOString(),
      };

      const response = await api.post(
        "/appointments",
        appointmentData
      );

      console.log("Booking response:", response.data);

      /*
       * Backend returns:
       *
       * {
       *   success: true,
       *   message: "...",
       *   appointment: {...}
       * }
       */

      const appointment = response.data.appointment;

      /*
       * Navigate to success page and pass the information
       * required by BookingSuccess.jsx.
       */

      navigate("/booking-success", {
        state: {
          booking: {
            customer,
            service: selectedService,
            price: selectedService.price,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
          },
        },
      });
    } catch (error) {
      console.error("Booking error:", error);

      if (error.response?.status === 409) {
        setError(
          "This time slot is already booked. Please choose another time."
        );
      } else if (error.response?.status === 404) {
        setError(
          "The selected service is no longer available."
        );
      } else if (error.response?.status === 400) {
        setError(
          error.response.data?.message ||
            "Please check your booking details."
        );
      } else {
        setError(
          "Something went wrong while booking your appointment. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormComplete =
    selectedService &&
    selectedDate &&
    selectedTime &&
    customer.name.trim() &&
    customer.phone.trim();

  return (
    <main className="min-h-screen bg-stone-950 px-6 py-16 text-white md:px-12">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
            Book Your Appointment
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Reserve Your Time
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-stone-400">
            Choose your service, date and time, then enter
            your details to complete the booking.
          </p>
        </div>

        {/* Booking Card */}
        <div className="rounded-3xl border border-stone-800 bg-stone-900 p-6 md:p-10">

          {/* Step Indicator */}
          <div className="mb-10 flex items-center justify-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-sm font-bold text-black">
              1
            </div>

            <div className="h-px w-12 bg-stone-700" />

            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                selectedDate
                  ? "bg-yellow-500 font-bold text-black"
                  : "bg-stone-800 text-stone-500"
              }`}
            >
              2
            </div>

            <div className="h-px w-12 bg-stone-700" />

            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                selectedTime
                  ? "bg-yellow-500 font-bold text-black"
                  : "bg-stone-800 text-stone-500"
              }`}
            >
              3
            </div>

          </div>

          {/* Service */}
          <ServiceSelector
            selectedService={selectedService}
            onSelect={(service) => {
              setSelectedService(service);
              setError("");
            }}
          />

          {/* Date */}
          {selectedService && (
            <DateSelector
              selectedDate={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);

                // Reset time if customer changes date
                setSelectedTime("");

                setError("");
              }}
            />
          )}

          {/* Time */}
          {selectedDate && (            
            <TimeSlots
              selectedDate={selectedDate}
              selectedService={selectedService}
              selectedTime={selectedTime}
              onSelect={(time) => {
                setSelectedTime(time);
                setError("");
              }}
            />
          )}

          {/* Customer */}
          {selectedTime && (
            <CustomerForm
              customer={customer}
              onChange={(data) => {
                setCustomer(data);
                setError("");
              }}
            />
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-900 bg-red-950/40 px-4 py-3">
              <p className="text-sm text-red-400">
                {error}
              </p>
            </div>
          )}

          {/* Confirm Button */}
          <div className="mt-10 flex justify-end">

            <button
              type="button"
              onClick={handleContinue}
              disabled={!isFormComplete || loading}
              className={`rounded-full px-7 py-3 font-semibold transition ${
                isFormComplete && !loading
                  ? "bg-yellow-500 text-black hover:bg-yellow-400"
                  : "cursor-not-allowed bg-stone-800 text-stone-500"
              }`}
            >
              {loading
                ? "Booking..."
                : "Confirm Appointment"}
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}

export default Booking;

