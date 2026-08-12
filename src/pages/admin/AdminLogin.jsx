import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/auth/login", formData);
      //console.log(response.data.success);

      if (response.data.success) {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Admin login error:", error);

      setError(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-950 px-6 text-white">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
            Admin Panel
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-3 text-stone-400">
            Login to manage your salon.
          </p>

        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-stone-800 bg-stone-900 p-6 md:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-stone-300"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                autoComplete="email"
                className="w-full rounded-xl border border-stone-800 bg-stone-950 px-4 py-3 text-white outline-none transition placeholder:text-stone-600 focus:border-yellow-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-stone-300"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-stone-800 bg-stone-950 px-4 py-3 text-white outline-none transition placeholder:text-stone-600 focus:border-yellow-500"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-900 bg-red-950/40 px-4 py-3">
                <p className="text-sm text-red-400">
                  {error}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl py-3 font-semibold transition ${
                loading
                  ? "cursor-not-allowed bg-stone-700 text-stone-500"
                  : "bg-yellow-500 text-black hover:bg-yellow-400"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>
        </div>

        {/* Back */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-sm text-stone-500 transition hover:text-yellow-400"
          >
            ← Back to website
          </button>
        </div>

      </div>

    </main>
  );
}

export default AdminLogin;