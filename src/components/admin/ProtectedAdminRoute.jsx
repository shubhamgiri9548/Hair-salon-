import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../../services/api";

function ProtectedAdminRoute() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await api.get("/auth/me");

        setAuthenticated(true);
      } catch (error) {
        console.error("Authentication check failed:", error);

        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-950 text-white">
        <p className="text-stone-400">
          Checking authentication...
        </p>
      </main>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedAdminRoute;