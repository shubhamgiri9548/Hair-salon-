import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import api from "../services/api";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");

        setServices(response.data.services);
      } catch (error) {
        console.error(error);
        setError("Unable to load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 text-white">

    

      <main className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">

          {/* Heading */}
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
              What We Offer
            </p>

            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              Our Services
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-stone-400">
              Choose from our professional hair and grooming
              services.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-center text-stone-400">
              Loading services...
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="text-center text-red-400">
              {error}
            </p>
          )}

          {/* Services */}
          {!loading && !error && services.length === 0 && (
            <p className="text-center text-stone-400">
              No services are currently available.
            </p>
          )}

          {!loading && !error && services.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                />
              ))}
            </div>
          )}

        </div>
      </main>



    </div>
  );
}

export default Services;