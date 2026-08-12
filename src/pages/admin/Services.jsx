import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminServices() {
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
  });

  // Fetch services
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/services");

      console.log("Services response:", response.data);

      setServices(
        response.data.services ||
          response.data.data ||
          []
      );
    } catch (error) {
      console.error("Failed to fetch services:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load services."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Open add form
  const handleAdd = () => {
    setEditingService(null);

    setFormData({
      name: "",
      price: "",
      duration: "",
    });

    setShowForm(true);
  };

  // Open edit form
  const handleEdit = (service) => {
    setEditingService(service);

    setFormData({
      name: service.name,
      price: service.price,
      duration: service.duration,
    });

    setShowForm(true);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const payload = {
        name: formData.name,
        price: Number(formData.price),
        duration: Number(formData.duration),
      };

      if (editingService) {
        await api.patch(
          `/services/${editingService._id}`,
          payload
        );
      } else {
        await api.post("/services", payload);
      }

      setShowForm(false);
      setEditingService(null);

      setFormData({
        name: "",
        price: "",
        duration: "",
      });

      await fetchServices();
    } catch (error) {
      console.error("Failed to save service:", error);

      setError(
        error.response?.data?.message ||
          "Unable to save service."
      );
    }
  };

  // Delete service
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(`/services/${id}`);

      await fetchServices();
    } catch (error) {
      console.error("Failed to delete service:", error);

      setError(
        error.response?.data?.message ||
          "Unable to delete service."
      );
    }
  };

  // Toggle active status
  const handleToggleStatus = async (service) => {
    try {
      setError("");

      await api.patch(`/services/${service._id}`, {
        isActive: !service.isActive,
      });

      await fetchServices();
    } catch (error) {
      console.error(
        "Failed to update service status:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to update service status."
      );
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 px-4 py-6 sm:px-6 md:p-10">

      {/* ================= HEADER ================= */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-yellow-400">
            Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Services
          </h1>

          <p className="mt-2 max-w-xl text-sm text-stone-400 sm:text-base">
            Manage the services available for booking.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="w-full rounded-xl bg-yellow-500 px-5 py-3.5 font-semibold text-black transition hover:bg-yellow-400 active:scale-[0.98] sm:w-auto"
        >
          + Add Service
        </button>

      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-900 bg-red-950/30 p-4">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* ================= ADD / EDIT FORM ================= */}
      {showForm && (
        <div className="mb-8 rounded-2xl border border-stone-800 bg-stone-950 p-5 sm:p-6">

          {/* Form Header */}
          <div className="mb-6 flex items-center justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-yellow-400">
                {editingService ? "Update" : "Create"}
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                {editingService
                  ? "Edit Service"
                  : "Add New Service"}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingService(null);
              }}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-stone-500 transition hover:bg-stone-800 hover:text-white"
              aria-label="Close form"
            >
              ✕
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 md:grid-cols-3"
          >

            {/* Service Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-400">
                Service Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Haircut"
                required
                className="w-full rounded-xl border border-stone-800 bg-stone-900 px-4 py-3 text-white placeholder:text-stone-600 outline-none transition focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-400">
                Price (₹)
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="100"
                min="0"
                required
                className="w-full rounded-xl border border-stone-800 bg-stone-900 px-4 py-3 text-white placeholder:text-stone-600 outline-none transition focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-400">
                Duration (minutes)
              </label>

              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="30"
                min="1"
                required
                className="w-full rounded-xl border border-stone-800 bg-stone-900 px-4 py-3 text-white placeholder:text-stone-600 outline-none transition focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row md:col-span-3">

              <button
                type="submit"
                className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400 active:scale-[0.98]"
              >
                {editingService
                  ? "Update Service"
                  : "Create Service"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingService(null);
                }}
                className="rounded-xl border border-stone-700 px-6 py-3 font-semibold text-stone-300 transition hover:bg-stone-800 hover:text-white"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="rounded-2xl border border-stone-800 bg-stone-950 p-12 text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-stone-700 border-t-yellow-400" />

          <p className="mt-4 text-sm text-stone-400">
            Loading services...
          </p>

        </div>
      )}

      {/* ================= EMPTY ================= */}
      {!loading && services.length === 0 && (
        <div className="rounded-2xl border border-stone-800 bg-stone-950 px-6 py-12 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone-900 text-2xl">
            ✂
          </div>

          <p className="mt-5 text-lg font-semibold text-white">
            No services found
          </p>

          <p className="mx-auto mt-2 max-w-sm text-sm text-stone-500">
            Add your first service to make it available
            for customers.
          </p>

          <button
            type="button"
            onClick={handleAdd}
            className="mt-6 rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            + Add Service
          </button>

        </div>
      )}

      {/* ================= SERVICES ================= */}
      {!loading && services.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {services.map((service) => (
            <div
              key={service._id}
              className="group rounded-2xl border border-stone-800 bg-stone-950 p-5 transition duration-300 hover:-translate-y-1 hover:border-stone-700 hover:shadow-xl hover:shadow-black/20 sm:p-6"
            >

              {/* Top Section */}
              <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                  <h2 className="truncate text-xl font-semibold text-white">
                    {service.name}
                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-sm text-stone-500">
                    <span>◷</span>
                    <span>{service.duration} min</span>
                  </div>

                </div>

                {/* Status */}
                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${
                    service.isActive
                      ? "border-green-900 bg-green-950 text-green-400"
                      : "border-stone-700 bg-stone-900 text-stone-500"
                  }`}
                >
                  {service.isActive
                    ? "Active"
                    : "Inactive"}
                </span>

              </div>

              {/* Price */}
              <div className="mt-7">

                <p className="text-xs font-medium uppercase tracking-wider text-stone-600">
                  Price
                </p>

                <p className="mt-1 text-3xl font-bold text-yellow-400">
                  ₹{service.price}
                </p>

              </div>

              {/* Divider */}
              <div className="my-6 border-t border-stone-800" />

              {/* Actions */}
              <div className="flex flex-wrap gap-2">

                <button
                  type="button"
                  onClick={() => handleEdit(service)}
                  className="rounded-lg border border-stone-700 px-4 py-2.5 text-sm font-medium text-stone-300 transition hover:border-yellow-500 hover:bg-yellow-500/5 hover:text-yellow-400"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleToggleStatus(service)
                  }
                  className="rounded-lg border border-stone-700 px-4 py-2.5 text-sm font-medium text-stone-300 transition hover:border-yellow-500 hover:bg-yellow-500/5 hover:text-yellow-400"
                >
                  {service.isActive
                    ? "Deactivate"
                    : "Activate"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(service._id)
                  }
                  className="rounded-lg border border-red-950 px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-950/40 hover:text-red-400"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default AdminServices;