import { useEffect, useState } from "react";
import api from "../../services/api";
import DashboardStats from "../../components/admin/DashboardStats";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/admin/dashboard");
        console.log("Dashboard response:", response.data);

        setStats(response.data.stats)
      } catch (error) {
        console.error(
          "Dashboard error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-stone-900 p-6 md:p-10">

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-yellow-400">
          Overview
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-stone-400">
          Here's what's happening at your salon.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-stone-800 bg-stone-950 p-8 text-center">
          <p className="text-stone-400">
            Loading dashboard...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-900 bg-red-950/30 p-5">
          <p className="text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* Stats */}
      {!loading && !error && (
        <DashboardStats stats={stats} />
      )}

    </div>
  );
}

export default AdminDashboard;

