
import { useState } from "react";

function CustomerForm({ customer, onChange }) {
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    onChange({
      ...customer,
      [name]: value,
    });

    // Clear error when user starts correcting the field
    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!customer.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!customer.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (!/^[0-9]{10}$/.test(customer.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">
        Your Details
      </h2>

      <p className="mt-2 text-stone-400">
        Enter your details to complete the appointment.
      </p>

      <div className="mt-6 space-y-5">

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-stone-300"
          >
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={customer.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className={`w-full rounded-xl border bg-stone-950 px-4 py-3 text-white outline-none transition placeholder:text-stone-600 ${
              errors.name
                ? "border-red-500"
                : "border-stone-800 focus:border-yellow-500"
            }`}
          />

          {errors.name && (
            <p className="mt-2 text-sm text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-stone-300"
          >
            Phone Number
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={customer.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            className={`w-full rounded-xl border bg-stone-950 px-4 py-3 text-white outline-none transition placeholder:text-stone-600 ${
              errors.phone
                ? "border-red-500"
                : "border-stone-800 focus:border-yellow-500"
            }`}
          />

          {errors.phone && (
            <p className="mt-2 text-sm text-red-400">
              {errors.phone}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default CustomerForm;

