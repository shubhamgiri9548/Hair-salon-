
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import ServiceCard from "./ServiceCard";

function FeaturedServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");

        setServices(response.data.services);
      } catch (error) {
        console.error("Error fetching services:", error);

        setError("Unable to load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="bg-stone-950 px-6 py-20 text-white md:px-12">
      <div className="mx-auto max-w-6xl">

        {/* Section Heading */}
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
            What We Offer
          </p>

          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Featured Services
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-stone-400">
            Professional grooming services designed to keep
            you looking your best.
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

        {/* No Services */}
        {!loading && !error && services.length === 0 && (
          <p className="text-center text-stone-400">
            No services are currently available.
          </p>
        )}

        {/* Services */}
        {!loading && !error && services.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
              />
            ))}
          </div>
        )}

        {/* View All */}
        {!loading && !error && services.length > 3 && (
          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="inline-block rounded-full border border-yellow-500 px-6 py-3 font-semibold text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
            >
              View All Services
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}

export default FeaturedServices;

