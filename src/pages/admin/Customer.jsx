import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/admin/customers");

        console.log("Customers response:", response.data);

        setCustomers(
          response.data.customers ||
            response.data.data ||
            []
        );
      } catch (error) {
        console.error(
          "Failed to fetch customers:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to load customers."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const formatJoinedDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-stone-900 px-4 py-6 sm:px-6 md:p-10">

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-yellow-400">
          Management
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          Customers
        </h1>

        <p className="mt-2 max-w-xl text-sm text-stone-400 sm:text-base">
          View and manage your salon customers.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-stone-800 bg-stone-950 p-10 text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-stone-700 border-t-yellow-400" />

          <p className="mt-4 text-sm text-stone-400">
            Loading customers...
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
        customers.length === 0 && (
          <div className="rounded-2xl border border-stone-800 bg-stone-950 px-6 py-12 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-900 text-xl">
              ♙
            </div>

            <p className="mt-4 text-lg font-semibold text-white">
              No customers found
            </p>

            <p className="mx-auto mt-2 max-w-sm text-sm text-stone-500">
              Customers will appear here after they book
              an appointment.
            </p>

          </div>
        )}

      {/* ================= DESKTOP TABLE ================= */}
      {!loading &&
        !error &&
        customers.length > 0 && (
          <div className="hidden overflow-hidden rounded-2xl border border-stone-800 bg-stone-950 md:block">

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="border-b border-stone-800 bg-stone-900">
                  <tr>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Phone
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Joined
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-800">

                  {customers.map((customer) => (
                    <tr
                      key={customer._id}
                      className="transition hover:bg-stone-900/60"
                    >

                      {/* Customer */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-500 font-semibold text-black">
                            {customer.name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>

                          <p className="font-medium text-white">
                            {customer.name}
                          </p>

                        </div>

                      </td>

                      {/* Phone */}
                      <td className="px-6 py-5 text-stone-300">
                        {customer.phone || "-"}
                      </td>

                      {/* Joined */}
                      <td className="px-6 py-5 text-stone-400">
                        {formatJoinedDate(
                          customer.createdAt
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">

                        <button
                          type="button"
                          className="rounded-lg border border-stone-700 px-3 py-2 text-sm text-stone-300 transition hover:border-yellow-500 hover:text-yellow-400"
                        >
                          View
                        </button>

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
        customers.length > 0 && (
          <div className="space-y-4 md:hidden">

            {customers.map((customer) => (
              <div
                key={customer._id}
                className="rounded-2xl border border-stone-800 bg-stone-950 p-5"
              >

                {/* Customer Header */}
                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-500 text-lg font-semibold text-black">
                    {customer.name
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-base font-semibold text-white">
                      {customer.name}
                    </p>

                    <p className="mt-1 text-sm text-stone-500">
                      Customer
                    </p>

                  </div>

                </div>

                {/* Divider */}
                <div className="my-5 border-t border-stone-800" />

                {/* Phone */}
                <div className="flex items-center justify-between gap-4">

                  <span className="text-sm text-stone-500">
                    Phone
                  </span>

                  <span className="text-sm font-medium text-stone-300">
                    {customer.phone || "-"}
                  </span>

                </div>

                {/* Joined */}
                <div className="mt-4 flex items-center justify-between gap-4">

                  <span className="text-sm text-stone-500">
                    Joined
                  </span>

                  <span className="text-sm text-stone-300">
                    {formatJoinedDate(
                      customer.createdAt
                    )}
                  </span>

                </div>

                {/* View */}
                <button
                  type="button"
                  className="mt-5 w-full rounded-xl border border-stone-700 px-4 py-3 text-sm font-medium text-stone-300 transition hover:border-yellow-500 hover:text-yellow-400"
                >
                  View Customer
                </button>

              </div>
            ))}

          </div>
        )}

    </div>
  );
}

export default AdminCustomers;