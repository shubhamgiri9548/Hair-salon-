
import { useEffect, useState } from "react";
import api from "../../services/api";

function ServiceSelector({ selectedService, onSelect }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");

        // Only show active services
        const activeServices = response.data.services.filter(
          (service) => service.isActive
        );

        setServices(activeServices);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Unable to load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="py-8 text-center text-stone-400">
        Loading services...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-400">
        {error}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="py-8 text-center text-stone-400">
        No services are currently available.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">
        Choose a Service
      </h2>

      <p className="mt-2 text-stone-400">
        Select the service you want to book.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {services.map((service) => {
          const isSelected =
            selectedService?._id === service._id;

          return (
            <button
              key={service._id}
              type="button"
              onClick={() => onSelect(service)}
              className={`rounded-2xl border p-5 text-left transition ${
                isSelected
                  ? "border-yellow-500 bg-yellow-500/10"
                  : "border-stone-800 bg-stone-900 hover:border-stone-600"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold">
                  {service.name}
                </h3>

                {isSelected && (
                  <span className="text-yellow-400">
                    ✓
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold text-yellow-400">
                  ₹{service.price}
                </span>

                <span className="text-sm text-stone-400">
                  {service.duration} min
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ServiceSelector;

