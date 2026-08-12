import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-900 text-white">

      {/* Mobile Header */}
      <header className="flex items-center justify-between border-b border-stone-800 bg-stone-950 px-5 py-4 md:hidden">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400">
            Salon Admin
          </p>

          <h1 className="text-lg font-bold">
            Hair Studio
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-white transition hover:bg-stone-800"
          aria-label="Open admin menu"
        >
          ☰
        </button>
      </header>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      <div className="flex min-h-[calc(100vh-73px)] md:min-h-screen">

        {/* Sidebar */}
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Page Content */}
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;