import { NavLink, useNavigate } from "react-router-dom";
import api from "../../services/api";

function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      onClose();
      navigate("/admin/login");
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "▦",
    },
    {
      name: "Appointments",
      path: "/admin/appointments",
      icon: "◷",
    },
    {
      name: "Customers",
      path: "/admin/customers",
      icon: "♙",
    },
    {
      name: "Services",
      path: "/admin/services",
      icon: "✂",
    },
  ];

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        flex w-64 flex-col
        border-r border-stone-800
        bg-stone-950 p-5 text-white
        transition-transform duration-300
        md:static md:z-auto md:min-h-screen
        md:translate-x-0
        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
      `}
    >

      {/* Mobile Close Button */}
      <div className="mb-8 flex items-center justify-between md:hidden">
        <p className="text-sm font-semibold text-yellow-400">
          MENU
        </p>

        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-stone-400 transition hover:bg-stone-800 hover:text-white"
          aria-label="Close admin menu"
        >
          ✕
        </button>
      </div>

      {/* Logo */}
      <div className="mb-10 px-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-400">
          Salon Admin
        </p>

        <h1 className="mt-2 text-xl font-bold">
          Hair Studio
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-yellow-500 text-black"
                  : "text-stone-400 hover:bg-stone-900 hover:text-white"
              }`
            }
          >
            <span className="text-lg">
              {item.icon}
            </span>

            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-stone-400 transition hover:bg-red-950/40 hover:text-red-400"
      >
        <span className="text-lg">
          ↪
        </span>

        Logout
      </button>

    </aside>
  );
}

export default AdminSidebar;